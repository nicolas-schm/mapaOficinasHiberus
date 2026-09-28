const SERVICIOS_BY_OFICINA: Record<string, string[]> = {
  quito: ["Arquitectura", "Desarrollo Frontend", "Backend", "Apps", "IA"],
  guayaquil: ["Desarrollo", "Frontend", "Backend", "Apps", "IA", "UX Diseño"],
  "buenos-aires": ["SAP", "Cloud"],
  santiago: ["SOC"],
  tetuan: ["Liferay"],
};

export function getOfficeServices(oficinaId: string): string[] {
  return SERVICIOS_BY_OFICINA[oficinaId] ?? [];
}
