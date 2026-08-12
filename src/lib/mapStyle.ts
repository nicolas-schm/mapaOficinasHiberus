import type { StyleSpecification } from "maplibre-gl";

const COUNTRY_LABEL_FILTERS: Record<string, (codes: string[]) => unknown[]> = {
  place_country_1: (codes) => [
    "all",
    ["==", ["get", "class"], "country"],
    ["<=", ["get", "rank"], 2],
    ["in", ["get", "iso_a2"], ["literal", codes]],
  ],
  place_country_2: (codes) => [
    "all",
    ["==", ["get", "class"], "country"],
    [">=", ["get", "rank"], 3],
    ["has", "iso_a2"],
    ["in", ["get", "iso_a2"], ["literal", codes]],
  ],
};

const HIDDEN_PLACE_LAYERS = [
  "place_hamlet",
  "place_suburbs",
  "place_villages",
  "place_town",
  "place_state",
  "place_continent",
  "place_city_r6",
  "place_city_r5",
  "place_city_dot_r7",
  "place_city_dot_r4",
  "place_city_dot_r2",
  "place_city_dot_z7",
  "place_capital_dot_z7",
];

const LAND_COLOR = "#2A49E0";
const LAND_LAYERS = new Set(["background", "landcover", "landuse"]);

const WATER_COLOR_EXPRESSION = [
  "interpolate",
  ["linear"],
  ["zoom"],
  1,
  "#1B3AC7",
  4,
  "#0E1E8C",
  10,
  "#030620",
];
const WATER_LAYERS = new Set(["water"]);

export async function loadStyleWithCountryFilter(
  url: string,
  codes: string[],
): Promise<StyleSpecification> {
  const res = await fetch(url);
  const style = (await res.json()) as StyleSpecification;

  style.layers = style.layers.map((layer) => {
    const buildFilter = COUNTRY_LABEL_FILTERS[layer.id];
    if (buildFilter) return { ...layer, filter: buildFilter(codes) };
    if (HIDDEN_PLACE_LAYERS.includes(layer.id)) {
      return {
        ...layer,
        layout: {
          ...("layout" in layer ? layer.layout : {}),
          visibility: "none",
        },
      };
    }
    if (LAND_LAYERS.has(layer.id) && "paint" in layer) {
      const colorKey =
        layer.type === "background" ? "background-color" : "fill-color";
      return {
        ...layer,
        paint: { ...layer.paint, [colorKey]: LAND_COLOR },
      };
    }
    if (WATER_LAYERS.has(layer.id) && "paint" in layer) {
      return {
        ...layer,
        paint: { ...layer.paint, "fill-color": WATER_COLOR_EXPRESSION },
      };
    }
    return layer;
  }) as StyleSpecification["layers"];

  return style;
}
