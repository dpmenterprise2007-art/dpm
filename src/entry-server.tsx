import React, { Suspense } from 'react';
import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
  Outlet,
  type StaticHandlerContext,
} from 'react-router-dom';
import { HelmetProvider, type HelmetServerState } from '@dr.pogodin/react-helmet';
import { routes } from './routes';
import Header from './layouts/parts/Header';
import Footer from './layouts/parts/Footer';
import Website from './layouts/Website';

type HelmetDataContext = { helmet?: HelmetServerState };

// SSRLayout renders Header/Footer as siblings to Outlet — all inside the router context
// provided by StaticRouterProvider above. This mirrors App.tsx's RootLayout wrapper.
function SSRLayout() {
  return (
    <Website>
      <Header />
      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
      <Footer />
    </Website>
  );
}

// Wrap page routes in a layout route so Header/Footer are inside the Router context
const layoutRoutes = [
  {
    path: '/',
    element: <SSRLayout />,
    children: routes,
  },
];

export async function render(url: string) {
  // Use layout-wrapped routes for both data loading and rendering
  const handler = createStaticHandler(layoutRoutes);
  const request = new Request(`http://localhost${url}`);

  let context: StaticHandlerContext | null = null;
  try {
    const result = await handler.query(request);
    if (result instanceof Response) {
      return {
        html: '',
        head: '',
        status: result.status,
        redirect: result.headers.get('Location') ?? '/',
      };
    }
    context = result;
  } catch {
    context = null;
  }

  const fallbackContext = context ?? ({
    basename: '',
    matches: [],
    location: { pathname: url, search: '', hash: '', state: null, key: 'default' },
    loaderData: {},
    actionData: null,
    errors: null,
    statusCode: 200,
    actionHeaders: {},
    loaderHeaders: {},
    _deepestRenderedBoundaryId: null,
  } as unknown as StaticHandlerContext);

  const router = createStaticRouter(handler.dataRoutes, fallbackContext);
  const helmetContext: HelmetDataContext = {};

  const html = renderToString(
    <React.StrictMode>
      <HelmetProvider context={helmetContext}>
        <StaticRouterProvider
          router={router}
          context={fallbackContext}
        />
      </HelmetProvider>
    </React.StrictMode>
  );

  const helmet = helmetContext.helmet;
  const head = helmet
    ? [
        helmet.title?.toString() ?? '',
        helmet.meta?.toString() ?? '',
        helmet.link?.toString() ?? '',
        helmet.script?.toString() ?? '',
      ].join('\n')
    : '';

  return {
    html,
    head,
    status: context?.statusCode ?? 200,
  };
}
