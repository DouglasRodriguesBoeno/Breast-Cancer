import { type NextRequest } from "next/server";

const DEFAULT_API_BASE_URL = "https://breast-cancer-api-production.up.railway.app";
const REPORT_INTELLIGENCE_PATH = "/api/report-intelligence";

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

function getApiBaseUrl() {
  const configuredBaseUrl =
    process.env.BREASTCARE_API_BASE_URL ??
    process.env.BREASTCARE_API_URL ??
    DEFAULT_API_BASE_URL;

  return configuredBaseUrl
    .trim()
    .replace(/\/$/, "")
    .replace(/\/api\/report-intelligence$/, "");
}

function buildTargetUrl(request: NextRequest, path?: string[]) {
  const suffix = path?.length ? `/${path.join("/")}` : "";
  const target = new URL(`${getApiBaseUrl()}${REPORT_INTELLIGENCE_PATH}${suffix}`);
  const source = new URL(request.url);

  source.searchParams.forEach((value, key) => {
    target.searchParams.set(key, value);
  });

  return target;
}

async function proxyReportIntelligenceRequest(
  request: NextRequest,
  context: RouteContext,
  method: "GET" | "POST"
) {
  try {
    const { path } = await context.params;
    const target = buildTargetUrl(request, path);

    const headers = new Headers();
    const contentType = request.headers.get("content-type");
    const accept = request.headers.get("accept");

    if (contentType) {
      headers.set("content-type", contentType);
    }

    if (accept) {
      headers.set("accept", accept);
    }

    const response = await fetch(target, {
      method,
      headers,
      body: method === "POST" ? await request.text() : undefined,
      cache: "no-store",
    });

    const responseBody = await response.text();
    const responseHeaders = new Headers();
    const responseContentType = response.headers.get("content-type");

    if (responseContentType) {
      responseHeaders.set("content-type", responseContentType);
    } else {
      responseHeaders.set("content-type", "application/json");
    }

    return new Response(responseBody, {
      status: response.status,
      headers: responseHeaders,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown proxy error";

    return Response.json(
      {
        error: "REPORT_INTELLIGENCE_PROXY_ERROR",
        message,
      },
      { status: 502 }
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyReportIntelligenceRequest(request, context, "GET");
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyReportIntelligenceRequest(request, context, "POST");
}
