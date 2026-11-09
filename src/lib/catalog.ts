import { events, type CampusEvent } from "./events";
const isEvent = (value: unknown): value is CampusEvent => {
  if (!value || typeof value !== "object") return false;
  const e = value as Record<string, unknown>;
  return (
    [
      "id",
      "title",
      "subtitle",
      "category",
      "date",
      "day",
      "month",
      "time",
      "venue",
      "duration",
      "description",
    ].every((key) => typeof e[key] === "string") &&
    typeof e.price === "number" &&
    ["blue", "red", "sand"].includes(String(e.theme)) &&
    ["ideas", "code", "art"].includes(String(e.icon)) &&
    Array.isArray(e.program) &&
    e.program.every((item) => typeof item === "string")
  );
};
export async function loadCatalog(signal: AbortSignal): Promise<CampusEvent[]> {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  if (!url || !key) return events;
  try {
    const endpoint = new URL(
      "/rest/v1/sqa_events?select=*&order=date.asc",
      url,
    );
    if (
      endpoint.protocol !== "https:" ||
      !endpoint.hostname.endsWith(".supabase.co")
    )
      return events;
    const response = await fetch(endpoint, {
      signal,
      headers: { apikey: key },
    });
    if (!response.ok) return events;
    const data: unknown = await response.json();
    return Array.isArray(data) && data.length > 0 && data.every(isEvent)
      ? data
      : events;
  } catch {
    return events;
  }
}
