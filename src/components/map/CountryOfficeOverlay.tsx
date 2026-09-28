import { MapGeoJSON } from "@/components/ui/map";
import officeCountries from "@/assets/paises-con-oficina.json";
import type { FeatureCollection, MultiPolygon, Polygon } from "geojson";

const OFFICE_COLOR = "#00bcff";

export function CountryOfficeOverlay() {
  return (
    <MapGeoJSON
      data={officeCountries as FeatureCollection<Polygon | MultiPolygon>}
      fillPaint={{ "fill-color": OFFICE_COLOR, "fill-opacity": 1 }}
      linePaint={false}
      interactive={false}
      beforeId="waterway"
    />
  );
}
