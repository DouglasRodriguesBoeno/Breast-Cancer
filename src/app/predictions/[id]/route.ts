const API_BASE_URL = process.env.BREASTCARE_API_URL ?? "http://localhost:8080";

async function readJson(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const response = await fetch(
      `${API_BASE_URL}/api/predictions/${encodeURIComponent(id)}`,
      {
        cache: "no-store",
      }
    );

    const data = await readJson(response);

    return Response.json(data, {
      status: response.status,
    });
  } catch {
    return Response.json(
      {
        message:
          "Unable to load prediction detail. Check if the Spring Boot service is running.",
      },
      {
        status: 502,
      }
    );
  }
}