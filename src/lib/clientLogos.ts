const clientLogoModules = import.meta.glob<{ default: string }>(
  "../assets/clientes/*/*.{png,jpg,jpeg,svg,webp}",
  { eager: true },
);

const LOGOS_BY_FOLDER: Record<string, string[]> = {};

for (const [path, mod] of Object.entries(clientLogoModules)) {
  const folder = path.match(/\/clientes\/([^/]+)\//)?.[1];
  if (!folder) continue;
  (LOGOS_BY_FOLDER[folder] ??= []).push(mod.default);
}

const COUNTRY_FOLDER: Record<string, string> = {
  Argentina: "argentina",
  Chile: "chile",
  Colombia: "colombia",
  Ecuador: "ecuador",
  México: "mexico",
  Polonia: "polonia",
  "Estados Unidos": "eeuu",
};

export function getClientLogos(pais: string): string[] {
  const folder = COUNTRY_FOLDER[pais];
  if (!folder) return [];
  return LOGOS_BY_FOLDER[folder] ?? [];
}
