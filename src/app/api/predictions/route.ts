const API_BASE_URL = process.env.BREASTCARE_API_URL ?? "http://localhost:8080";

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${API_BASE_URL}/api/predictions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const data = await readJson(response);

    return Response.json(data, {
      status: response.status,
    });
  } catch {
    return Response.json(
      {
        message:
          "Unable to connect to the BreastCare API. Check if the Spring Boot service is running.",
      },
      {
        status: 502,
      }
    );
  }
}

export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/predictions`, {
      cache: "no-store",
    });

    const data = await readJson(response);

    return Response.json(data, {
      status: response.status,
    });
  } catch {
    return Response.json(
      {
        message:
          "Unable to load predictions history. Check if the Spring Boot service is running.",
      },
      {
        status: 502,
      }
    );
  }
}