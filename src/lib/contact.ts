export const contactSandbox = "allow-scripts";
export const contactCsp =
  "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src 'none'; font-src 'none'; connect-src 'none'; media-src 'none'; object-src 'none'; frame-src 'none'; worker-src 'none'; form-action 'none'; base-uri 'none'";
export function buildContactDocument(message: string) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="UTF-8"><meta http-equiv="Content-Security-Policy" content="${contactCsp}"><meta name="referrer" content="no-referrer"><style>html{color:#26364f;font:15px/1.7 system-ui,sans-serif;overflow-wrap:anywhere}body{margin:16px}h1,h2,h3{line-height:1.25}a{color:#1d4189}</style></head><body>${message}</body></html>`;
}
