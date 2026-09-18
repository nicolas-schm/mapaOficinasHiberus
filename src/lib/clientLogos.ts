const clientLogoModules = import.meta.glob<{ default: string }>(
  "../assets/clientes/*/*.{png,jpg,jpeg,svg,webp}",
  { eager: true },
);

export type ClientLogo = { src: string; name: string };

const LOGOS_BY_FOLDER: Record<string, ClientLogo[]> = {};

for (const [path, mod] of Object.entries(clientLogoModules)) {
  const folder = path.match(/\/clientes\/([^/]+)\//)?.[1];
  if (!folder) continue;
  const filename = path.split("/").pop() ?? "";
  const name = decodeURIComponent(filename)
    .replace(/\.[^.]+$/, "")
    .replace(/^Name=/, "");
  (LOGOS_BY_FOLDER[folder] ??= []).push({ src: mod.default, name });
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

export function getClientLogos(pais: string): ClientLogo[] {
  const folder = COUNTRY_FOLDER[pais];
  if (!folder) return [];
  return LOGOS_BY_FOLDER[folder] ?? [];
}
