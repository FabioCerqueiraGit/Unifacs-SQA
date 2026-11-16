import { afterEach, describe, expect, it, vi } from "vitest";
import { loadCatalog } from "./catalog";
import { events } from "./events";

const localCatalogIsUsable = (result: Awaited<ReturnType<typeof loadCatalog>>) => {
  expect(result).toBe(events);
  expect(result.length).toBeGreaterThan(0);
  expect(result[0]).toMatchObject({
    id: expect.any(String),
    title: expect.any(String),
    date: expect.any(String),
    venue: expect.any(String),
  });
};

const configureRemote = () => {
  vi.stubEnv("VITE_SUPABASE_URL", "https://ct038-mock.supabase.co");
  vi.stubEnv("VITE_SUPABASE_ANON_KEY", "public-test-key-only");
};

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("CT038 — alternativa local do catálogo", () => {
  it("usa o catálogo local quando a configuração remota está ausente", async () => {
    vi.stubEnv("VITE_SUPABASE_URL", "");
    vi.stubEnv("VITE_SUPABASE_ANON_KEY", "");

    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);

    const result = await loadCatalog(new AbortController().signal);

    localCatalogIsUsable(result);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("usa o catálogo local quando a leitura remota falha por erro de rede", async () => {
    configureRemote();
    const fetchMock = vi.fn().mockRejectedValue(new Error("mock network failure"));
    vi.stubGlobal("fetch", fetchMock);

    const result = await loadCatalog(new AbortController().signal);

    localCatalogIsUsable(result);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("usa o catálogo local quando o servidor remoto responde com erro HTTP", async () => {
    configureRemote();
    const fetchMock = vi.fn().mockResolvedValue({ ok: false, status: 503 });
    vi.stubGlobal("fetch", fetchMock);

    const result = await loadCatalog(new AbortController().signal);

    localCatalogIsUsable(result);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("usa o catálogo local quando a resposta remota é vazia", async () => {
    configureRemote();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await loadCatalog(new AbortController().signal);

    localCatalogIsUsable(result);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("usa o catálogo local quando a resposta não atende ao contrato CampusEvent", async () => {
    configureRemote();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [{ id: "incompleto", title: "Resposta incompatível" }],
    });
    vi.stubGlobal("fetch", fetchMock);

    const result = await loadCatalog(new AbortController().signal);

    localCatalogIsUsable(result);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("aceita catálogo remoto válido por HTTPS e faz somente leitura", async () => {
    configureRemote();
    const remoteCatalog = [{ ...events[0], title: "Evento remoto de teste" }];
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => remoteCatalog,
    });
    vi.stubGlobal("fetch", fetchMock);

    const signal = new AbortController().signal;
    const result = await loadCatalog(signal);

    expect(result).toEqual(remoteCatalog);
    expect(result).not.toBe(events);
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [endpoint, options] = fetchMock.mock.calls[0] as [URL, RequestInit];
    expect(endpoint.protocol).toBe("https:");
    expect(endpoint.hostname).toBe("ct038-mock.supabase.co");
    expect(endpoint.pathname).toBe("/rest/v1/sqa_events");
    expect(endpoint.searchParams.get("select")).toBe("*");
    expect(endpoint.searchParams.get("order")).toBe("date.asc");
    expect(options.signal).toBe(signal);
    expect(options.headers).toEqual({ apikey: "public-test-key-only" });
    // Sem method explícito, fetch usa GET; nenhum método de escrita é solicitado.
    expect(options.method).toBeUndefined();
  });
});
