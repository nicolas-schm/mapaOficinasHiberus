import { MapGeoJSON } from "@/components/ui/map";
import dimmedCountries from "@/assets/paises-sin-oficina.json";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

const DIM_COLOR = "#213fad";

export function CountryDimOverlay() {
  return (
    <MapGeoJSON
      data={dimmedCountries as FeatureCollection<Polygon | MultiPolygon>}
      fillPaint={{ "fill-color": DIM_COLOR, "fill-opacity": 1 }}
      linePaint={false}
      interactive={false}
    />
  );
}
