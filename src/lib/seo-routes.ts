/**
 * Agent-editable registry of publicly-crawlable routes. Consumed by the
 * /sitemap.xml handler in src/server/entry.ts.
 *
 * Guidelines for maintaining this file:
 * - Add a new entry whenever you add a new publicly-crawlable page.
 * - Do not include dynamic-param routes like "/products/:id" directly.
 *   Instead, enumerate real values (e.g. "/products/desk-pro") or skip.
 * - `path` MUST start with "/".
 * - Priorities are between 0.0 and 1.0. Home = 1.0, main sections = 0.8,
 *   deep pages = 0.5.
 * - Dev-only or auth-required routes MUST NOT be listed.
 */

export interface SeoRoute {
	path: string;
	changefreq?:
		| "always"
		| "hourly"
		| "daily"
		| "weekly"
		| "monthly"
		| "yearly"
		| "never";
	priority?: number;
	lastmod?: string;
}

export const seoRoutes: SeoRoute[] = [
	{ path: "/", changefreq: "weekly", priority: 1.0 },
	{ path: "/about", changefreq: "monthly", priority: 0.8 },
	{ path: "/services", changefreq: "monthly", priority: 0.9 },
	{ path: "/services/residential-interior", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/corporate-interior", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/modular-kitchen", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/furniture-manufacturing", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/government-projects", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/turnkey-solutions", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/architectural-solutions", changefreq: "monthly", priority: 0.7 },
	{ path: "/services/commercial-showrooms", changefreq: "monthly", priority: 0.7 },
	{ path: "/projects", changefreq: "weekly", priority: 0.8 },
	{ path: "/certifications", changefreq: "yearly", priority: 0.7 },
	{ path: "/contact", changefreq: "monthly", priority: 0.8 },
	{ path: "/careers", changefreq: "weekly", priority: 0.7 },
	{ path: "/blog", changefreq: "weekly", priority: 0.8 },
	{ path: "/marketplace", changefreq: "weekly", priority: 0.9 },
	{ path: "/marketplace/buyer-registration", changefreq: "monthly", priority: 0.6 },
	{ path: "/marketplace/supplier-registration", changefreq: "monthly", priority: 0.6 },
	{ path: "/marketplace/gem-support", changefreq: "monthly", priority: 0.6 },
	{ path: "/marketplace/elite-enquiry", changefreq: "monthly", priority: 0.6 },
	{ path: "/privacy-policy", changefreq: "yearly", priority: 0.3 },
	{ path: "/terms-conditions", changefreq: "yearly", priority: 0.3 },
];
