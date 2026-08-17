const clientLogoModules = import.meta.glob<{ default: string }>(
  "../assets/clientes/*.{png,jpg,jpeg,svg,webp}",
  { eager: true },
);

const CLIENT_LOGOS = Object.keys(clientLogoModules)
  .sort()
  .map((path) => clientLogoModules[path].default);

export function getClientLogos(count = 6): string[] {
  if (CLIENT_LOGOS.length === 0) return [];
  return Array.from(
    { length: count },
    (_, i) => CLIENT_LOGOS[i % CLIENT_LOGOS.length],
  );
}
