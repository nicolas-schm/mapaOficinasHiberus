import * as MapLibreGL from "maplibre-gl";
import { createContext, useContext } from "react";
import type { Theme } from "./theme";

export type MapContextValue = {
  map: MapLibreGL.Map | null;
  isLoaded: boolean;
  resolvedTheme: Theme;
};

export const MapContext = createContext<MapContextValue | null>(null);

export function useMap() {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a Map component");
  }
  return context;
}

export type MarkerContextValue = {
  marker: MapLibreGL.Marker;
  map: MapLibreGL.Map | null;
};

export const MarkerContext = createContext<MarkerContextValue | null>(null);

export function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) {
    throw new Error("Marker components must be used within MapMarker");
  }
  return context;
}
