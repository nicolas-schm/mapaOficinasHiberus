import type { Region } from "@/types/office";

export const REGIONES: Region[] = [
  {
    id: "todos",
    label: "Todos",
    center: [-30.523865403512332, 6.621962644059004],
    zoom: 3.1833544906905806,
  },
  { id: "europa", label: "Europa", center: [15, 52], zoom: 3.4 },
  { id: "america", label: "América", center: [-80, 10], zoom: 2 },
  { id: "africa", label: "África", center: [15, 10], zoom: 3.6 },
];
