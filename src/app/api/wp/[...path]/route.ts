export const runtime = "nodejs";

import { NextResponse } from "next/server";

function buildWpUrl(pathParts: string[], searchParams: URLSearchParams) {
    const base = process.env.WP_API_URL || "http://localhost:6060";
    const path = pathParts.join("/");
    const qs = searchParams.toString();
    // Forward to /wp-json/wp/v2/
    return `${base}/wp-json/wp/v2/${path}${qs ? `?${qs}` : ""}`;
}

export async function GET(req: Request, ctx: { params: { path: string[] } }) {
    const { searchParams } = new URL(req.url);
    const url = buildWpUrl(ctx.params.path, searchParams);
    const jwtToken = process.env.WP_JWT_TOKEN;

    const headers: Record<string, string> = {
        "Content-Type": "application/json",
        "X-ANTIGRAVITY-SECRET": "ag_secret_987654321",
    };

    if (jwtToken) {
        headers["Authorization"] = `Bearer ${jwtToken}`;
    }

    try {
        const res = await fetch(url, {
            headers,
            cache: "no-store",
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error(`WordPress API error: ${res.status} ${res.statusText}`, errorText);
            return new NextResponse(errorText, {
                status: res.status,
                headers: { "Content-Type": "application/json" },
            });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Fetch error in WP proxy:", error);
        return NextResponse.json(
            { error: "Failed to fetch from WordPress" },
            { status: 500 }
        );
    }
}
