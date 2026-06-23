// @vitest-environment node
import express from "express";
import { describe, expect, it } from "vitest";

import { renderSsrDocument, registerAdSenseTextRoutes } from "./entry";

const publisherId = "ca-pub-1234567890123456";
const canonicalScript = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}" crossorigin="anonymous"></script>`;

/**
 * Invoke an Express app's route handler for a given path without binding a
 * real TCP socket. We extract the matching route handler from the router stack
 * and call it directly with lightweight mock req/res objects.
 */
async function callRoute(
	app: express.Express,
	method: string,
	path: string,
): Promise<{ status: number; headers: Record<string, string>; text: string }> {
	return new Promise((resolve, reject) => {
		const headers: Record<string, string> = {};
		let statusCode = 200;
		let body = "";

		const req = {
			method: method.toUpperCase(),
			url: path,
			path,
			headers: {},
		} as unknown as express.Request;

		const res = {
			status(code: number) {
				statusCode = code;
				return this;
			},
			setHeader(name: string, value: string) {
				headers[name.toLowerCase()] = value;
			},
			send(data: string) {
				body = data ?? "";
				resolve({ status: statusCode, headers, text: body });
				return this;
			},
		} as unknown as express.Response;

		// Walk the Express router stack to find a matching route
		const router = (app as unknown as { router: { stack: Array<{ route?: { path: string; methods: Record<string, boolean>; stack: Array<{ handle: express.RequestHandler }> } }> } }).router;
		if (!router) {
			reject(new Error("No router found on app"));
			return;
		}

		const matched = router.stack.find(
			(layer) =>
				layer.route &&
				layer.route.path === path &&
				layer.route.methods[method.toLowerCase()],
		);

		if (!matched?.route) {
			// No route matched — simulate 404
			resolve({ status: 404, headers: { "content-type": "text/plain", "cache-control": "no-cache" }, text: "" });
			return;
		}

		try {
			matched.route.stack[0].handle(req, res, (err?: unknown) => {
				if (err) reject(err);
			});
		} catch (err) {
			reject(err);
		}
	});
}

describe("entry AdSense text routes", () => {
	it("serves enabled ads.txt as text/plain with no-cache", async () => {
		const app = express();
		registerAdSenseTextRoutes(app, {
			publisherId: null,
			scriptHtml: "",
			adsTxt: "google.com, pub-123, DIRECT, f08c47fec0942fa0",
			appAdsTxt: null,
		});

		const response = await callRoute(app, "GET", "/ads.txt");

		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toContain("text/plain");
		expect(response.headers["cache-control"]).toBe("no-cache");
		expect(response.text).toBe("google.com, pub-123, DIRECT, f08c47fec0942fa0");
	});

	it("serves enabled app-ads.txt as text/plain with no-cache", async () => {
		const app = express();
		registerAdSenseTextRoutes(app, {
			publisherId: null,
			scriptHtml: "",
			adsTxt: null,
			appAdsTxt: "google.com, pub-456, DIRECT, f08c47fec0942fa0",
		});

		const response = await callRoute(app, "GET", "/app-ads.txt");

		expect(response.status).toBe(200);
		expect(response.headers["content-type"]).toContain("text/plain");
		expect(response.headers["cache-control"]).toBe("no-cache");
		expect(response.text).toBe("google.com, pub-456, DIRECT, f08c47fec0942fa0");
	});

	it("returns 404 for disabled AdSense text routes", async () => {
		const app = express();
		registerAdSenseTextRoutes(app, {
			publisherId: null,
			scriptHtml: "",
			adsTxt: null,
			appAdsTxt: null,
		});

		const adsTxt = await callRoute(app, "GET", "/ads.txt");
		const appAdsTxt = await callRoute(app, "GET", "/app-ads.txt");

		expect(adsTxt.status).toBe(404);
		expect(adsTxt.headers["content-type"]).toContain("text/plain");
		expect(adsTxt.headers["cache-control"]).toBe("no-cache");
		expect(appAdsTxt.status).toBe(404);
		expect(appAdsTxt.headers["content-type"]).toContain("text/plain");
		expect(appAdsTxt.headers["cache-control"]).toBe("no-cache");
	});
});

describe("entry SSR rendering", () => {
	it("appends the canonical AdSense script to existing head output", () => {
		const html = renderSsrDocument(
			"<html><head><!--app-head--></head><body><!--app-html--></body></html>",
			{
				head: "<title>Generated Site</title>",
				html: "<main>Rendered app</main>",
			},
			{
				scriptHtml: canonicalScript,
			},
		);

		expect(html).toContain(`<title>Generated Site</title>\n${canonicalScript}`);
		expect(html).toContain("<main>Rendered app</main>");
		expect(html).not.toContain("<!--app-head-->");
		expect(html).not.toContain("<!--app-html-->");
	});

	it("keeps SSR head output unchanged when AdSense script output is disabled", () => {
		const html = renderSsrDocument(
			"<html><head><!--app-head--></head><body><!--app-html--></body></html>",
			{
				head: "<title>Generated Site</title>",
				html: "<main>Rendered app</main>",
			},
			{
				scriptHtml: "",
			},
		);

		expect(html).toContain("<title>Generated Site</title>");
		expect(html).not.toContain("pagead2.googlesyndication.com");
		expect(html).toContain("<main>Rendered app</main>");
	});
});
