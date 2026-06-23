// Polyfill browser globals required by pdfjs-dist (runs at module init time)
if (typeof globalThis.DOMMatrix === 'undefined') {
  // @ts-ignore
  globalThis.DOMMatrix = class DOMMatrix {
    a=1; b=0; c=0; d=1; e=0; f=0;
    multiply() { return this; }
    inverse() { return this; }
    translate() { return this; }
    scale() { return this; }
    rotate() { return this; }
    static fromMatrix(m: unknown) { return new (globalThis.DOMMatrix as any)(); }
  };
}
if (typeof globalThis.ImageData === 'undefined') {
  // @ts-ignore
  globalThis.ImageData = class ImageData {
    width: number; height: number; data: Uint8ClampedArray;
    constructor(w: number, h: number) { this.width = w; this.height = h; this.data = new Uint8ClampedArray(w * h * 4); }
  };
}
if (typeof globalThis.Path2D === 'undefined') {
  // @ts-ignore
  globalThis.Path2D = class Path2D {};
}

import { render as ssrRender } from "../entry-server";
import express, { type NextFunction, type Request, type Response } from "express";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "node:url";
import { dirname, extname, join } from "node:path";
import { readFileSync } from "node:fs";

// <api-imports>
import auth_login_post from "./api/auth/login/POST";
import auth_session_get from "./api/auth/session/GET";
import auth_logout_post from "./api/auth/logout/POST";
import auth_seed_director_post from "./api/auth/seed-director/POST";
import admin_users_get from "./api/admin/users/GET";
import admin_users_post from "./api/admin/users/POST";
import admin_users_userId_put from "./api/admin/users/[userId]/PUT";
import admin_users_userId_delete from "./api/admin/users/[userId]/DELETE";
import admin_leads_get from "./api/admin/leads/GET";
import admin_leads_leadId_put from "./api/admin/leads/[leadId]/PUT";
import admin_leads_leadId_delete from "./api/admin/leads/[leadId]/DELETE";
import admin_leads_verify_realtime_post from "./api/admin/leads/verify-realtime/POST";
import admin_leads_bulk_scan_post from "./api/admin/leads/bulk-scan/POST";
import admin_leads_auto_fix_post from "./api/admin/leads/auto-fix/POST";
import admin_stats_get from "./api/admin/stats/GET";
import ai_hunter_post from "./api/ai/hunter/POST";
import ai_auto_pipeline_post from "./api/ai/auto-pipeline/POST";
import ai_chat_post_0 from "./api/ai/chat/POST";
import ai_gem_analysis_post_1 from "./api/ai/gem-analysis/POST";
import ai_generate_leads_post_2 from "./api/ai/generate-leads/POST";
import ai_generate_quote_post_3 from "./api/ai/generate-quote/POST";
import ai_generate_social_posts_post_4 from "./api/ai/generate-social-posts/POST";
import ai_score_lead_post_5 from "./api/ai/score-lead/POST";
import ai_whatsapp_reply_post_6 from "./api/ai/whatsapp-reply/POST";
import automation_config_get_7 from "./api/automation/config/GET";
import automation_config_post_8 from "./api/automation/config/POST";
import automation_test_email_post_9 from "./api/automation/test/email/POST";
import automation_test_social_post_10 from "./api/automation/test/social/POST";
import automation_test_whatsapp_post_11 from "./api/automation/test/whatsapp/POST";
import commerce_create_checkout_session_post_12 from "./api/commerce/create-checkout-session/POST";
import dashboard_stats_get_13 from "./api/dashboard/stats/GET";
import email_send_campaign_post_14 from "./api/email/send-campaign/POST";
import finance_expenses_get_15 from "./api/finance/expenses/GET";
import finance_expenses_post_16 from "./api/finance/expenses/POST";
import finance_expenses_expenseId_delete_17 from "./api/finance/expenses/[expenseId]/DELETE";
import finance_expenses_expenseId_put_18 from "./api/finance/expenses/[expenseId]/PUT";
import finance_seed_data_post_19 from "./api/finance/seed-data/POST";
import forms_budget_calculator_post_20 from "./api/forms/budget-calculator/POST";
import forms_buyer_registration_post_21 from "./api/forms/buyer-registration/POST";
import forms_career_application_post_22 from "./api/forms/career-application/POST";
import forms_contact_get_23 from "./api/forms/contact/GET";
import forms_contact_post_24 from "./api/forms/contact/POST";
import forms_elite_enquiry_post_25 from "./api/forms/elite-enquiry/POST";
import forms_supplier_registration_post_26 from "./api/forms/supplier-registration/POST";
import gem_bids_generate_post_27 from "./api/gem/bids/generate/POST";
import gem_bids_list_get_28 from "./api/gem/bids/list/GET";
import gem_bids_submit_post_29 from "./api/gem/bids/submit/POST";
import gem_boq_calculate_post_30 from "./api/gem/boq/calculate/POST";
import gem_boq_generate_post_31 from "./api/gem/boq/generate/POST";
import gem_documents_list_get_32 from "./api/gem/documents/list/GET";
import gem_documents_upload_post_33 from "./api/gem/documents/upload/POST";
import gem_tenders_analyze_post_34 from "./api/gem/tenders/analyze/POST";
import gem_tenders_list_get_35 from "./api/gem/tenders/list/GET";
import gem_tenders_seed_post_36 from "./api/gem/tenders/seed/POST";
import gem_tenders_upload_post_37 from "./api/gem/tenders/upload/POST";
import gem_tenders_tenderId_get_38 from "./api/gem/tenders/[tenderId]/GET";
import gst_returns_get_39 from "./api/gst/returns/GET";
import health_get_40 from "./api/health/GET";
import inventory_products_get_41 from "./api/inventory/products/GET";
import inventory_products_post_42 from "./api/inventory/products/POST";
import leads_backup_post_43 from "./api/leads/backup/POST";
import leads_cleanup_post_44 from "./api/leads/cleanup/POST";
import leads_list_get_45 from "./api/leads/list/GET";
import leads_otp_send_post_46 from "./api/leads/otp/send/POST";
import leads_otp_verify_post_47 from "./api/leads/otp/verify/POST";
import leads_score_post_48 from "./api/leads/score/POST";
import leads_verify_post_49 from "./api/leads/verify/POST";
import leads_verify_all_post_50 from "./api/leads/verify-all/POST";
import purchase_bills_get_51 from "./api/purchase/bills/GET";
import purchase_bills_post_52 from "./api/purchase/bills/POST";
import sales_convert_lead_post_53 from "./api/sales/convert-lead/POST";
import sales_deals_post_54 from "./api/sales/deals/POST";
import sales_deals_list_get_55 from "./api/sales/deals/list/GET";
import sales_deals_dealId_delete_56 from "./api/sales/deals/[dealId]/DELETE";
import sales_deals_dealId_put_57 from "./api/sales/deals/[dealId]/PUT";
import sales_follow_ups_list_get_58 from "./api/sales/follow-ups/list/GET";
import sales_follow_ups_schedule_post_59 from "./api/sales/follow-ups/schedule/POST";
import sales_invoices_get_60 from "./api/sales/invoices/GET";
import sales_invoices_post_61 from "./api/sales/invoices/POST";
import sales_quotes_generate_post_62 from "./api/sales/quotes/generate/POST";
import social_auto_post_post_63 from "./api/social/auto-post/POST";
import social_auto_post_list_get_64 from "./api/social/auto-post/list/GET";
import social_posts_delete_65 from "./api/social/posts/DELETE";
import social_publish_post_66 from "./api/social/publish/POST";
import whatsapp_auto_reply_post_67 from "./api/whatsapp/auto-reply/POST";
import whatsapp_broadcast_post_68 from "./api/whatsapp/broadcast/POST";
import whatsapp_messages_get_69 from "./api/whatsapp/messages/GET";
import whatsapp_send_post_70 from "./api/whatsapp/send/POST";
import whatsapp_test_post_71 from "./api/whatsapp/test/POST";
import whatsapp_webhook_get_72 from "./api/whatsapp/webhook/GET";
import whatsapp_webhook_post_73 from "./api/whatsapp/webhook/POST";
// </api-imports>

import { seoRoutes } from "../lib/seo-routes.js";

function normalizeCommerceApiBaseUrlEnv() {
	if (process.env.GODADDY_API_BASE_URL) return;
	const hostOnly = process.env.VITE_GODADDY_API_HOST;
	if (!hostOnly) return;
	const normalizedHost = hostOnly.replace(/^https?:\/\//, "").trim();
	if (!normalizedHost) return;
	process.env.GODADDY_API_BASE_URL = `https://${normalizedHost}`;
}

normalizeCommerceApiBaseUrlEnv();

const app = express();

app.set("trust proxy", true);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

// <api-registrations>
app.post("/api/auth/login", auth_login_post);
app.get("/api/auth/session", auth_session_get);
app.post("/api/auth/logout", auth_logout_post);
app.post("/api/auth/seed-director", auth_seed_director_post);
app.get("/api/admin/users", admin_users_get);
app.post("/api/admin/users", admin_users_post);
app.put("/api/admin/users/:userId", admin_users_userId_put);
app.delete("/api/admin/users/:userId", admin_users_userId_delete);
app.get("/api/admin/leads", admin_leads_get);
app.put("/api/admin/leads/:leadId", admin_leads_leadId_put);
app.delete("/api/admin/leads/:leadId", admin_leads_leadId_delete);
app.post("/api/admin/leads/verify-realtime", admin_leads_verify_realtime_post);
app.post("/api/admin/leads/bulk-scan", admin_leads_bulk_scan_post);
app.post("/api/admin/leads/auto-fix", admin_leads_auto_fix_post);
app.get("/api/admin/stats", admin_stats_get);
app.post("/api/ai/hunter", ai_hunter_post);
app.post("/api/ai/auto-pipeline", ai_auto_pipeline_post);
app.post("/api/ai/chat", ai_chat_post_0);
app.post("/api/ai/gem-analysis", ai_gem_analysis_post_1);
app.post("/api/ai/generate-leads", ai_generate_leads_post_2);
app.post("/api/ai/generate-quote", ai_generate_quote_post_3);
app.post("/api/ai/generate-social-posts", ai_generate_social_posts_post_4);
app.post("/api/ai/score-lead", ai_score_lead_post_5);
app.post("/api/ai/whatsapp-reply", ai_whatsapp_reply_post_6);
app.get("/api/automation/config", automation_config_get_7);
app.post("/api/automation/config", automation_config_post_8);
app.post("/api/automation/test/email", automation_test_email_post_9);
app.post("/api/automation/test/social", automation_test_social_post_10);
app.post("/api/automation/test/whatsapp", automation_test_whatsapp_post_11);
app.post("/api/commerce/create-checkout-session", commerce_create_checkout_session_post_12);
app.get("/api/dashboard/stats", dashboard_stats_get_13);
app.post("/api/email/send-campaign", email_send_campaign_post_14);
app.get("/api/finance/expenses", finance_expenses_get_15);
app.post("/api/finance/expenses", finance_expenses_post_16);
app.delete("/api/finance/expenses/:expenseId", finance_expenses_expenseId_delete_17);
app.put("/api/finance/expenses/:expenseId", finance_expenses_expenseId_put_18);
app.post("/api/finance/seed-data", finance_seed_data_post_19);
app.post("/api/forms/budget-calculator", forms_budget_calculator_post_20);
app.post("/api/forms/buyer-registration", forms_buyer_registration_post_21);
app.post("/api/forms/career-application", forms_career_application_post_22);
app.get("/api/forms/contact", forms_contact_get_23);
app.post("/api/forms/contact", forms_contact_post_24);
app.post("/api/forms/elite-enquiry", forms_elite_enquiry_post_25);
app.post("/api/forms/supplier-registration", forms_supplier_registration_post_26);
app.post("/api/gem/bids/generate", gem_bids_generate_post_27);
app.get("/api/gem/bids/list", gem_bids_list_get_28);
app.post("/api/gem/bids/submit", gem_bids_submit_post_29);
app.post("/api/gem/boq/calculate", gem_boq_calculate_post_30);
app.post("/api/gem/boq/generate", gem_boq_generate_post_31);
app.get("/api/gem/documents/list", gem_documents_list_get_32);
app.post("/api/gem/documents/upload", gem_documents_upload_post_33);
app.post("/api/gem/tenders/analyze", gem_tenders_analyze_post_34);
app.get("/api/gem/tenders/list", gem_tenders_list_get_35);
app.post("/api/gem/tenders/seed", gem_tenders_seed_post_36);
app.post("/api/gem/tenders/upload", gem_tenders_upload_post_37);
app.get("/api/gem/tenders/:tenderId", gem_tenders_tenderId_get_38);
app.get("/api/gst/returns", gst_returns_get_39);
app.get("/api/health", health_get_40);
app.get("/api/inventory/products", inventory_products_get_41);
app.post("/api/inventory/products", inventory_products_post_42);
app.post("/api/leads/backup", leads_backup_post_43);
app.post("/api/leads/cleanup", leads_cleanup_post_44);
app.get("/api/leads/list", leads_list_get_45);
app.post("/api/leads/otp/send", leads_otp_send_post_46);
app.post("/api/leads/otp/verify", leads_otp_verify_post_47);
app.post("/api/leads/score", leads_score_post_48);
app.post("/api/leads/verify", leads_verify_post_49);
app.post("/api/leads/verify-all", leads_verify_all_post_50);
app.get("/api/purchase/bills", purchase_bills_get_51);
app.post("/api/purchase/bills", purchase_bills_post_52);
app.post("/api/sales/convert-lead", sales_convert_lead_post_53);
app.post("/api/sales/deals", sales_deals_post_54);
app.get("/api/sales/deals/list", sales_deals_list_get_55);
app.delete("/api/sales/deals/:dealId", sales_deals_dealId_delete_56);
app.put("/api/sales/deals/:dealId", sales_deals_dealId_put_57);
app.get("/api/sales/follow-ups/list", sales_follow_ups_list_get_58);
app.post("/api/sales/follow-ups/schedule", sales_follow_ups_schedule_post_59);
app.get("/api/sales/invoices", sales_invoices_get_60);
app.post("/api/sales/invoices", sales_invoices_post_61);
app.post("/api/sales/quotes/generate", sales_quotes_generate_post_62);
app.post("/api/social/auto-post", social_auto_post_post_63);
app.get("/api/social/auto-post/list", social_auto_post_list_get_64);
app.delete("/api/social/posts", social_posts_delete_65);
app.post("/api/social/publish", social_publish_post_66);
app.post("/api/whatsapp/auto-reply", whatsapp_auto_reply_post_67);
app.post("/api/whatsapp/broadcast", whatsapp_broadcast_post_68);
app.get("/api/whatsapp/messages", whatsapp_messages_get_69);
app.post("/api/whatsapp/send", whatsapp_send_post_70);
app.post("/api/whatsapp/test", whatsapp_test_post_71);
app.get("/api/whatsapp/webhook", whatsapp_webhook_get_72);
app.post("/api/whatsapp/webhook", whatsapp_webhook_post_73);
// </api-registrations>

// Error middleware must be registered AFTER the routes it protects
app.use("/api", (err: unknown, req: Request, res: Response, _next: NextFunction) => {
	console.error("ssr.api.error", {
		url: req.url,
		error: err instanceof Error ? err.stack : String(err),
	});
	res.status(500).json({ error: "Internal server error" });
});

function baseUrl(req: Request): string {
	const env = process.env.PUBLIC_URL || process.env.SITE_URL;
	if (env) return env.replace(/\/+$/, "");
	return `${req.protocol}://${req.hostname}`;
}

function escapeXml(s: string): string {
	return s.replace(/[&<>"']/g, (c) =>
		({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&apos;" })[c]!,
	);
}

app.get("/robots.txt", (req, res) => {
	const base = baseUrl(req);
	const body = [
		"User-agent: *",
		"Allow: /",
		"",
		`Sitemap: ${base}/sitemap.xml`,
		"",
	].join("\n");
	res.type("text/plain").set("Cache-Control", "public, max-age=3600").send(body);
});

app.get("/sitemap.xml", (req, res) => {
	const base = baseUrl(req);
	const urls = seoRoutes
		.filter((r) => typeof r.path === "string" && r.path.startsWith("/"))
		.map((r) => {
			const loc = `${base}${r.path}`;
			const parts = [`    <loc>${escapeXml(loc)}</loc>`];
			if (r.lastmod) parts.push(`    <lastmod>${escapeXml(r.lastmod)}</lastmod>`);
			if (r.changefreq) parts.push(`    <changefreq>${r.changefreq}</changefreq>`);
			if (r.priority !== undefined)
				parts.push(`    <priority>${r.priority.toFixed(1)}</priority>`);
			return `  <url>\n${parts.join("\n")}\n  </url>`;
		})
		.join("\n");
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	res.type("application/xml").set("Cache-Control", "public, max-age=3600").send(body);
});

if (import.meta.env.PROD) {
	const __dirname = dirname(fileURLToPath(import.meta.url));
	const clientDir = join(__dirname, "client");

	app.use(
		express.static(clientDir, {
			index: false,
			setHeaders(res, filePath) {
				res.set(
					"Cache-Control",
					filePath.includes("/assets/")
						? "public, max-age=31536000, immutable"
						: "no-cache",
				);
			},
		}),
	);

	app.use((_req, res, next) => {
		res.set("Cache-Control", "no-cache");
		next();
	});

	let template: string;
	try {
		template = readFileSync(join(clientDir, "index.html"), "utf-8");
	} catch (err) {
		console.error("ssr.template.load-failed", {
			path: join(clientDir, "index.html"),
			error: err instanceof Error ? err.message : String(err),
		});
		process.exit(1);
	}
	if (!template.includes("<!--app-head-->") || !template.includes("<!--app-html-->")) {
		console.error("ssr.template.markers-missing", {
			hasHead: template.includes("<!--app-head-->"),
			hasHtml: template.includes("<!--app-html-->"),
		});
		process.exit(1);
	}
	const fallbackShell = template
		.replace("<!--app-head-->", "")
		.replace("<!--app-html-->", "");

	type RenderResult = {
		html: string;
		head: string;
		status: number;
		redirect?: string;
	};
	let renderFn: ((url: string) => Promise<RenderResult>) = ssrRender;
	// Static import — no dynamic loading needed, renderFn is always ready
	void renderFn; // suppress unused warning

	app.get(/.*/, async (req, res, next) => {
		if (req.method !== "GET") return next();
		if (req.path.startsWith("/api")) return next();
		if (extname(req.path)) return next();
		const sendFallback = () =>
			res
				.status(503)
				.set("Content-Type", "text/html; charset=utf-8")
				.set("Cache-Control", "no-store")
				.send(fallbackShell);
		try {
			const result = await renderFn(req.url);
			if (result.redirect) {
				res.redirect(result.status, result.redirect);
				return;
			}
			if (!result.html) {
				console.error("ssr.render.error-response", {
					url: req.url,
					status: result.status,
				});
				res
					.status(result.status)
					.set("Content-Type", "text/html; charset=utf-8")
					.set("Cache-Control", "no-store")
					.send(fallbackShell);
				return;
			}
			const out = template
				.replace("<!--app-head-->", () => result.head)
				.replace("<!--app-html-->", () => result.html);
			res
				.status(result.status)
				.set("Content-Type", "text/html; charset=utf-8")
				.set("Cache-Control", "no-cache")
				.send(out);
		} catch (err) {
			console.error("ssr.render.failed", {
				url: req.url,
				error: err instanceof Error ? err.stack : String(err),
			});
			sendFallback();
		}
	});

	const shutdown = async (signal: string) => {
		console.log(`Got ${signal}, shutting down gracefully...`);
		let mod: { closeConnection?: () => Promise<void> | void } | null = null;
		try {
			const dbClient = "./db/client" + ".js";
			mod = await import(/* @vite-ignore */ dbClient);
		} catch (error: unknown) {
			const code = (error as { code?: string } | null)?.code;
			if (code !== "ERR_MODULE_NOT_FOUND") {
				console.error("ssr.shutdown.db-import-failed", {
					error: error instanceof Error ? error.message : String(error),
				});
			}
		}
		if (mod && typeof mod.closeConnection === "function") {
			try {
				await mod.closeConnection();
				console.log("Database connections closed");
			} catch (error: unknown) {
				console.error("ssr.shutdown.db-close-failed", {
					error: error instanceof Error ? error.message : String(error),
				});
			}
		}
		process.exit(0);
	};

	(["SIGTERM", "SIGINT"] as const).forEach((signal) => {
		process.once(signal, () => {
			void shutdown(signal);
		});
	});

	const rawPort = process.env.PORT || "3000";
	const port = parseInt(rawPort, 10);
	if (!Number.isInteger(port) || port <= 0 || port > 65535) {
		console.error("ssr.server.invalid-port", { rawPort });
		process.exit(1);
	}
	// Always bind to 0.0.0.0 so the GoDaddy proxy can reach the app.
	// The platform may inject HOST=127.0.0.1 via .env which would break routing.
	const host = "0.0.0.0";
	const server = app.listen(port, host, () => {
		console.log(`Server listening on http://${host}:${port}`);
	});
	server.on("error", (err: NodeJS.ErrnoException) => {
		console.error("ssr.server.listen-failed", {
			port,
			host,
			code: err.code,
			error: err.message,
		});
		process.exit(1);
	});
}

export default app;

// ---------------------------------------------------------------------------
// Exported helpers used by entry.test.ts
// ---------------------------------------------------------------------------

export interface AdSenseConfig {
  publisherId: string | null;
  scriptHtml: string;
  adsTxt: string | null;
  appAdsTxt: string | null;
}

export interface SsrRenderResult {
  head: string;
  html: string;
}

export interface SsrAdSenseOptions {
  scriptHtml: string;
}

/** Register /ads.txt and /app-ads.txt routes on an Express app. */
export function registerAdSenseTextRoutes(
  expressApp: import('express').Express,
  config: AdSenseConfig,
): void {
  expressApp.get('/ads.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    if (config.adsTxt) {
      res.status(200).send(config.adsTxt);
    } else {
      res.status(404).send('');
    }
  });

  expressApp.get('/app-ads.txt', (_req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Cache-Control', 'no-cache');
    if (config.appAdsTxt) {
      res.status(200).send(config.appAdsTxt);
    } else {
      res.status(404).send('');
    }
  });
}

/** Replace SSR markers in the HTML template and optionally inject AdSense script. */
export function renderSsrDocument(
  template: string,
  result: SsrRenderResult,
  adSense: SsrAdSenseOptions,
): string {
  const headContent = adSense.scriptHtml
    ? `${result.head}\n${adSense.scriptHtml}`
    : result.head;
  return template
    .replace('<!--app-head-->', headContent)
    .replace('<!--app-html-->', result.html);
}
