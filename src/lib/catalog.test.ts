import { afterEach, describe, expect, it, vi } from "vitest";
import { events } from "./events";
import { loadCatalog } from "./catalog";

const signal = new AbortController().signal;
const remoteEvents = events.map((event) => ({ ...event, program: [...event.program] }));

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CT038 — fallback para o catálogo local", () => {
  it("usa o catálogo local quando as configurações Supabase estão ausentes", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "");
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    await expect(loadCatalog(signal)).resolves.toEqual(events);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("usa o catálogo local quando a comunicação remota falha", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://exemplo.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "chave-publica-de-teste");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network error")));

    await expect(loadCatalog(signal)).resolves.toEqual(events);
  });

  it("usa o catálogo local quando o servidor responde com erro HTTP", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://exemplo.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "chave-publica-de-teste");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false }));

    await expect(loadCatalog(signal)).resolves.toEqual(events);
  });

  it("usa o catálogo local quando a resposta remota está vazia", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://exemplo.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "chave-publica-de-teste");
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: vi.fn().mockResolvedValue([]) }),
    );

    await expect(loadCatalog(signal)).resolves.toEqual(events);
  });

  it("usa o catálogo local quando os dados remotos são incompatíveis", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://exemplo.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "chave-publica-de-teste");
    const invalidEvent = { ...remoteEvents[0], price: "gratuito" };
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue([invalidEvent]),
      }),
    );

    await expect(loadCatalog(signal)).resolves.toEqual(events);
  });

  it("usa os eventos remotos quando a resposta contém dados válidos", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "https://exemplo.supabase.co");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "chave-publica-de-teste");
    const validRemote = remoteEvents.map((event, index) => ({
      ...event,
      title: `Evento remoto ${index + 1}`,
    }));
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue(validRemote),
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(loadCatalog(signal)).resolves.toEqual(validRemote);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBeInstanceOf(URL);
    expect(String(fetchMock.mock.calls[0][0])).toContain(
      "/rest/v1/sqa_events?select=*&order=date.asc",
    );
  });
});
