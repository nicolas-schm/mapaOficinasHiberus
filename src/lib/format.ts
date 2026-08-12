export function displayCiudad(ciudad: string): string {
  if (ciudad.includes(" – ")) return ciudad.split(" – ")[1];
  if (ciudad.includes(" - ")) return ciudad.split(" - ")[1];
  return ciudad;
}
