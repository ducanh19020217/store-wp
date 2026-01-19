export const runtime = "nodejs";

import { NextResponse } from "next/server";

function buildWooUrl(pathParts: string[], searchParams: URLSearchParams) {
    const base = process.env.WC_API_URL || "http://localhost:6060";
    const path = pathParts.join("/");
    const qs = searchParams.toString();
    return `${base}/wp-json/wc/v3/${path}${qs ? `?${qs}` : ""}`;
}

export async function GET(req: Request, ctx: { params: { path: string[] } }) {
    const requestId = `${Date.now()}-${Math.random().toString(16).slice(2)}`;

    try {
        const incomingUrl = new URL(req.url);
        const { searchParams } = incomingUrl;

        const key = process.env.WC_CONSUMER_KEY;
        const secret = process.env.WC_CONSUMER_SECRET;
        const jwtToken = process.env.WP_JWT_TOKEN;

        // ✅ LOG 1: request trace
        console.log(`\n========== [WC_PROXY][${requestId}] START ==========`);
        console.log(`[${requestId}] Incoming URL:`, incomingUrl.toString());
        console.log(`[${requestId}] Incoming path params:`, ctx.params?.path);

        const rawUrl = buildWooUrl(ctx.params.path, searchParams);
        const urlObj = new URL(rawUrl);

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            "X-ANTIGRAVITY-SECRET": "ag_secret_987654321",
        };

        // Ưu tiên dùng JWT nếu có, nếu không dùng Consumer Key/Secret
        if (jwtToken) {
            console.log(`[${requestId}] Using JWT Token for authentication`);
            headers["Authorization"] = `Bearer ${jwtToken}`;
        } else if (key && secret) {
            console.log(`[${requestId}] Using Consumer Key/Secret for authentication`);
            urlObj.searchParams.set("consumer_key", key);
            urlObj.searchParams.set("consumer_secret", secret);
        } else {
            console.error(`[${requestId}] ❌ Missing authentication credentials (JWT or WC Keys)`);
            return NextResponse.json(
                { error: "Missing authentication credentials" },
                { status: 500 }
            );
        }

        console.log(`[${requestId}] Final WC URL:`, urlObj.toString().split("consumer_secret=")[0] + "...");

        const start = Date.now();
        const res = await fetch(urlObj.toString(), {
            headers,
            cache: "no-store",
        });
        const duration = Date.now() - start;

        console.log(`[${requestId}] WC response status: ${res.status} (${duration}ms)`);

        const text = await res.text();
        if (!res.ok) {
            console.error(`[${requestId}] ❌ WC call failed:`, text);
            return new NextResponse(text, {
                status: res.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = JSON.parse(text);
        console.log(`[${requestId}] ✅ SUCCESS`);
        console.log(`========== [WC_PROXY][${requestId}] END ==========\n`);

        return NextResponse.json(data);
    } catch (err: any) {
        console.error(`\n========== [WC_PROXY] CRASH [${requestId}] ==========\n`, err);
        return NextResponse.json(
            {
                error: "Failed to fetch from WooCommerce",
                detail: err?.message || String(err),
            },
            { status: 500 }
        );
    }
}
