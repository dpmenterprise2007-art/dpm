import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import HomePage from './pages/index';
import AuthGuard from './components/AuthGuard';
// Lazy load components for code splitting (except HomePage for instant loading)
const isDevelopment = import.meta.env.MODE === 'development';
const AboutPage = lazy(() => import('./pages/about'));
const ServicesPage = lazy(() => import('./pages/services'));
const ProjectsPage = lazy(() => import('./pages/projects'));
const ContactPage = lazy(() => import('./pages/contact'));
const PrivacyPolicyPage = lazy(() => import('./pages/privacy-policy'));
const TermsConditionsPage = lazy(() => import('./pages/terms-conditions'));
const CareersPage = lazy(() => import('./pages/careers'));
const ResidentialInteriorPage = lazy(() => import('./pages/services/residential-interior'));
const CorporateInteriorPage = lazy(() => import('./pages/services/corporate-interior'));
const ModularKitchenPage = lazy(() => import('./pages/services/modular-kitchen'));
const FurnitureManufacturingPage = lazy(() => import('./pages/services/furniture-manufacturing'));
const GovernmentProjectsPage = lazy(() => import('./pages/services/government-projects'));
const TurnkeySolutionsPage = lazy(() => import('./pages/services/turnkey-solutions'));
const ArchitecturalSolutionsPage = lazy(() => import('./pages/services/architectural-solutions'));
const CommercialShowroomsPage = lazy(() => import('./pages/services/commercial-showrooms'));
const PortalLoginPage = lazy(() => import('./pages/portal/login'));
const BlogPage = lazy(() => import('./pages/Blog'));
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'));
const CertificationsPage = lazy(() => import('./pages/certifications'));
const MarketplacePage = lazy(() => import('./pages/marketplace'));
const GeMSupportPage = lazy(() => import('./pages/marketplace/gem-support'));
const SupplierRegistrationPage = lazy(() => import('./pages/marketplace/supplier-registration'));
const BuyerRegistrationPage = lazy(() => import('./pages/marketplace/buyer-registration'));
const EliteEnquiryPage = lazy(() => import('./pages/marketplace/elite-enquiry'));
const CareerApplicationPage = lazy(() => import('./pages/careers/application'));
const DashboardLoginPage = lazy(() => import('./pages/dashboard/login'));
const DirectorDashboardPage = lazy(() => import('./pages/dashboard/director'));
const LeadsPage = lazy(() => import('./pages/dashboard/leads'));
const MasterSheetPage = lazy(() => import('./pages/dashboard/master-sheet'));
const ControlPanelPage = lazy(() => import('./pages/dashboard/control-panel'));
const AIAutomationPage = lazy(() => import('./pages/dashboard/ai-automation'));
const SalesPipelinePage = lazy(() => import('./pages/dashboard/sales-pipeline'));
const GeMPortalPage = lazy(() => import('./pages/dashboard/gem-portal'));
const MarketingHubPage = lazy(() => import('./pages/dashboard/marketing'));
const FinanceCenterPage = lazy(() => import('./pages/dashboard/finance'));
const AutomationSettingsPage = lazy(() => import('./pages/dashboard/automation-settings'));
const AIMasterControlPage = lazy(() => import('./pages/dashboard/ai-master-control'));
const LeadVerificationPage = lazy(() => import('./pages/dashboard/lead-verification'));
const LeadFollowupPage = lazy(() => import('./pages/dashboard/lead-followup'));
const WhatsAppDashboardPage = lazy(() => import('./pages/dashboard/whatsapp'));
const AISalesMarketingPage = lazy(() => import('./pages/dashboard/ai-sales-marketing'));
const AILeadIntelligencePage = lazy(() => import('./pages/dashboard/ai-lead-intelligence'));
const AdminUsersPage = lazy(() => import('./pages/dashboard/admin-users'));
const AdminPortalPage = lazy(() => import('./pages/dashboard/admin-portal'));
const AIHunterPage = lazy(() => import('./pages/dashboard/ai-hunter'));
const NotFoundPage = isDevelopment ? lazy(() => import('../dev-tools/src/PageNotFound')) : lazy(() => import('./pages/_404'));

/** Wrap a dashboard element with AuthGuard */
function guarded(element: React.ReactElement) {
  return <AuthGuard>{element}</AuthGuard>;
}

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <HomePage />,
  },
  {
    path: '/about',
    element: <AboutPage />,
  },
  {
    path: '/services',
    element: <ServicesPage />,
  },
  {
    path: '/projects',
    element: <ProjectsPage />,
  },
  {
    path: '/contact',
    element: <ContactPage />,
  },
  {
    path: '/privacy-policy',
    element: <PrivacyPolicyPage />,
  },
  {
    path: '/terms-conditions',
    element: <TermsConditionsPage />,
  },
  {
    path: '/careers',
    element: <CareersPage />,
  },
  {
    path: '/services/residential-interior',
    element: <ResidentialInteriorPage />,
  },
  {
    path: '/services/corporate-interior',
    element: <CorporateInteriorPage />,
  },
  {
    path: '/services/modular-kitchen',
    element: <ModularKitchenPage />,
  },
  {
    path: '/services/furniture-manufacturing',
    element: <FurnitureManufacturingPage />,
  },
  {
    path: '/services/government-projects',
    element: <GovernmentProjectsPage />,
  },
  {
    path: '/services/turnkey-solutions',
    element: <TurnkeySolutionsPage />,
  },
  {
    path: '/services/architectural-solutions',
    element: <ArchitecturalSolutionsPage />,
  },
  {
    path: '/services/commercial-showrooms',
    element: <CommercialShowroomsPage />,
  },
  {
    path: '/portal/login',
    element: <PortalLoginPage />,
  },
  {
    path: '/blog',
    element: <BlogPage />,
  },
  {
    path: '/blog/:slug',
    element: <BlogPostPage />,
  },
  {
    path: '/certifications',
    element: <CertificationsPage />,
  },
  {
    path: '/marketplace',
    element: <MarketplacePage />,
  },
  {
    path: '/marketplace/gem-support',
    element: <GeMSupportPage />,
  },
  {
    path: '/marketplace/supplier-registration',
    element: <SupplierRegistrationPage />,
  },
  {
    path: '/marketplace/buyer-registration',
    element: <BuyerRegistrationPage />,
  },
  {
    path: '/marketplace/elite-enquiry',
    element: <EliteEnquiryPage />,
  },
  {
    path: '/careers/application',
    element: <CareerApplicationPage />,
  },
  {
    path: '/dashboard/login',
    element: <DashboardLoginPage />,
  },
  {
    path: '/dashboard/director',
    element: guarded(<DirectorDashboardPage />),
  },
  {
    path: '/dashboard/leads',
    element: guarded(<LeadsPage />),
  },
  {
    path: '/dashboard/master-sheet',
    element: guarded(<MasterSheetPage />),
  },
  {
    path: '/dashboard/control-panel',
    element: guarded(<ControlPanelPage />),
  },
  {
    path: '/dashboard/ai-automation',
    element: guarded(<AIAutomationPage />),
  },
  {
    path: '/dashboard/sales-pipeline',
    element: guarded(<SalesPipelinePage />),
  },
  {
    path: '/dashboard/gem-portal',
    element: guarded(<GeMPortalPage />),
  },
  {
    path: '/dashboard/marketing',
    element: guarded(<MarketingHubPage />),
  },
  {
    path: '/dashboard/finance',
    element: guarded(<FinanceCenterPage />),
  },
  {
    path: '/dashboard/automation-settings',
    element: guarded(<AutomationSettingsPage />),
  },
  {
    path: '/dashboard/ai-master-control',
    element: guarded(<AIMasterControlPage />),
  },
  {
    path: '/dashboard/lead-verification',
    element: guarded(<LeadVerificationPage />),
  },
  {
    path: '/dashboard/lead-followup',
    element: guarded(<LeadFollowupPage />),
  },
  {
    path: '/dashboard/whatsapp',
    element: guarded(<WhatsAppDashboardPage />),
  },
  {
    path: '/dashboard/ai-sales-marketing',
    element: guarded(<AISalesMarketingPage />),
  },
  {
    path: '/dashboard/ai-lead-intelligence',
    element: guarded(<AILeadIntelligencePage />),
  },
  {
    path: '/dashboard/admin-users',
    element: guarded(<AdminUsersPage />),
  },
  {
    path: '/dashboard/admin-portal',
    element: guarded(<AdminPortalPage />),
  },
  {
    path: '/dashboard/ai-hunter',
    element: guarded(<AIHunterPage />),
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

// Types for type-safe navigation
export type Path = '/' | '/about' | '/services' | '/projects' | '/contact' | '/privacy-policy' | '/terms-conditions' | '/careers' | '/careers/application' | '/services/residential-interior' | '/services/corporate-interior' | '/services/modular-kitchen' | '/services/furniture-manufacturing' | '/services/government-projects' | '/services/turnkey-solutions' | '/portal/login' | '/blog' | `/blog/${string}` | '/certifications' | '/marketplace' | '/marketplace/gem-support' | '/marketplace/supplier-registration' | '/marketplace/buyer-registration' | '/marketplace/elite-enquiry';

export type Params = Record<string, string | undefined>;
