export type Oficina = {
  id: string;
  ciudad: string;
  nombre?: string;
  direccion: string;
  telefono?: string;
  web?: string;
  longitude: number;
  latitude: number;
};

export type OficinaOrigen = {
  pais: string;
  iso: string;
  region: string;
};

export type Region = {
  id: string;
  label: string;
  center: [number, number];
  zoom: number;
};
