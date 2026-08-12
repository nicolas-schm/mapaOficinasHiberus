import { useEffect, useState } from "react";
import type { MapStyleOption } from "@/components/ui/map";
import { loadStyleWithCountryFilter } from "@/lib/mapStyle";
import { PAISES_CON_OFICINA } from "@/data/oficinas";

const LIGHT_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json";
const DARK_STYLE_URL =
  "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json";

type MapStyles = {
  light?: MapStyleOption;
  dark?: MapStyleOption;
};

export function useMapStyles(): MapStyles {
  const [styles, setStyles] = useState<MapStyles>({});

  useEffect(() => {
    let cancelled = false;

    Promise.all([
      loadStyleWithCountryFilter(LIGHT_STYLE_URL, PAISES_CON_OFICINA),
      loadStyleWithCountryFilter(DARK_STYLE_URL, PAISES_CON_OFICINA),
    ]).then(([light, dark]) => {
      if (!cancelled) setStyles({ light, dark });
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return styles;
}
