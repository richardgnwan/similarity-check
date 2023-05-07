import { RevokeApiData } from "@/types/api";

export async function revokeApiKey({ keyId }: { keyId: string }) {
  const response = await fetch("/api/api-key/revoke", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ keyId }),
  });
  const data = (await response.json()) as RevokeApiData;

  if (data.error || !data.success) {
    if (data.error instanceof Array) {
      throw new Error(data.error.join(", "));
    }
    throw new Error(data.error ?? "Something went wrong");
  }

  return data.success;
}
