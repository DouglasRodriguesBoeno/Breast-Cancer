import type {
  PredictionListItem,
  PredictionRequest,
  PredictionResponse,
} from "@/types/prediction";

async function requestJson<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(
      data?.message ??
        data?.error ??
        "Unexpected error while communicating with the prediction API."
    );
  }

  return data as T;
}

export function createPrediction(
  payload: PredictionRequest
): Promise<PredictionResponse> {
  return requestJson<PredictionResponse>("/api/predictions", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getPredictionById(id: string): Promise<PredictionResponse> {
  return requestJson<PredictionResponse>(`/api/predictions/${id}`);
}

export function getPredictionHistory(): Promise<PredictionListItem[]> {
  return requestJson<PredictionListItem[]>("/api/predictions");
}