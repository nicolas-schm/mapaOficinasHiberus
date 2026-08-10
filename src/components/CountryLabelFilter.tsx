import { useEffect } from "react";
import { useMap } from "@/components/ui/map";

const COUNTRY_LABEL_LAYERS = ["place_country_1", "place_country_2"];

/** Hides country name labels on the base map except for the given ISO 3166-1 alpha-2 codes. */
export function CountryLabelFilter({ codes }: { codes: string[] }) {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    for (const layerId of COUNTRY_LABEL_LAYERS) {
      if (!map.getLayer(layerId)) {
        console.warn("[CountryLabelFilter] layer not found:", layerId);
        continue;
      }
      const baseFilter = map.getFilter(layerId);
      console.log("[CountryLabelFilter] base filter for", layerId, baseFilter);
      if (!baseFilter) continue;
      map.setFilter(layerId, [
        "all",
        baseFilter,
        ["in", ["get", "iso_a2"], ["literal", codes]],
      ]);
      console.log(
        "[CountryLabelFilter] new filter for",
        layerId,
        map.getFilter(layerId),
      );
    }

    const logVisible = () => {
      const features = map.queryRenderedFeatures({
        layers: COUNTRY_LABEL_LAYERS.filter((id) => map.getLayer(id)),
      });
      console.log(
        "[CountryLabelFilter] visible countries:",
        features.map((f) => ({
          name: f.properties?.name,
          iso_a2: f.properties?.iso_a2,
        })),
      );
    };
    map.once("idle", logVisible);
  }, [map, isLoaded, codes]);

  return null;
}
