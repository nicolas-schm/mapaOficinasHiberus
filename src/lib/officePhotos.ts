const officePhotoModules = import.meta.glob<{ default: string }>(
  "../assets/oficinas/*/*.{jpg,jpeg,png,webp,jfif}",
  { eager: true },
);

const OFFICE_PHOTOS: Record<string, string[]> = {};

for (const [path, mod] of Object.entries(officePhotoModules)) {
  const officeId = path.match(/\/oficinas\/([^/]+)\//)?.[1];
  if (!officeId) continue;
  (OFFICE_PHOTOS[officeId] ??= []).push(mod.default);
}

for (const fotos of Object.values(OFFICE_PHOTOS)) {
  fotos.sort(
    (a, b) =>
      Number(a.match(/_(\d+)\./)?.[1] ?? 0) -
      Number(b.match(/_(\d+)\./)?.[1] ?? 0),
  );
}

export function getOfficePhotos(officeId: string): string[] {
  return OFFICE_PHOTOS[officeId] ?? [];
}
