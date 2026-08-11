import type { StyleSpecification } from "maplibre-gl";

// The original filters use the legacy (non-expression) dialect, e.g.
// ["<=", "rank", 2]. Mixing that dialect inside a hand-built expression
// (e.g. wrapping it in a new "all" alongside an ["in", ["get", ...]] clause)
// makes MapLibre parse "rank" as a plain string literal instead of a
// property getter, which throws "Cannot compare types 'string' and
// 'number'". So each layer's replacement filter is written out fully in the
// expression dialect instead of merging with the original.
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

// Every other "place" label layer in the CARTO/OpenMapTiles schema (cities,
// towns, villages, hamlets, suburbs, states, continents). None of these
// carry a country code property, so they can't be filtered by country —
// hidden outright so only the filtered country names and our own office
// markers remain on top of the background color.
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

// The land fill in the CARTO styles: a "background" layer covering the
// whole canvas plus two landcover/landuse fill layers drawn on top of it
// (water is a separate "water" layer, untouched here).
const LAND_COLOR = "#2A49E0";
const LAND_LAYERS = new Set(["background", "landcover", "landuse"]);

// Ocean · claro / medio / oscuro: interpolated by zoom instead of a flat
// color, so it reads light at the globe view and darkens as you zoom into a
// city, matching the reference gradient.
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

/**
 * Fetches a MapLibre style and restricts the country name label layers to
 * only the given ISO 3166-1 alpha-2 codes. Patched at the style-definition
 * level (rather than via setFilter after load) so the restriction survives
 * theme swaps and style reloads without any load-order race.
 */
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
