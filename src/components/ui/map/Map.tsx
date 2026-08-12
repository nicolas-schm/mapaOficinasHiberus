"use client";

import * as MapLibreGL from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
import { MapContext } from "./context";
import { defaultStyles, blankMapStyle, useStableValue } from "./styles";
import { useResolvedTheme, type Theme } from "./theme";

export type MapViewport = {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
};

export type MapStyleOption = string | MapLibreGL.StyleSpecification;

export type MapRef = MapLibreGL.Map;

export type MapProps = {
  children?: ReactNode;
  className?: string;
  theme?: Theme;
  styles?: {
    light?: MapStyleOption;
    dark?: MapStyleOption;
  };
  blank?: boolean;
  projection?: MapLibreGL.ProjectionSpecification;
  viewport?: Partial<MapViewport>;
  onViewportChange?: (viewport: MapViewport) => void;
  loading?: boolean;
} & Omit<MapLibreGL.MapOptions, "container" | "style">;

function DefaultLoader() {
  return (
    <div className="bg-background/50 absolute inset-0 z-10 flex items-center justify-center backdrop-blur-xs">
      <div className="flex gap-1">
        <span className="bg-muted-foreground/60 size-1.5 animate-pulse rounded-full" />
        <span className="bg-muted-foreground/60 size-1.5 animate-pulse rounded-full [animation-delay:150ms]" />
        <span className="bg-muted-foreground/60 size-1.5 animate-pulse rounded-full [animation-delay:300ms]" />
      </div>
    </div>
  );
}

function getViewport(map: MapLibreGL.Map): MapViewport {
  const center = map.getCenter();
  return {
    center: [center.lng, center.lat],
    zoom: map.getZoom(),
    bearing: map.getBearing(),
    pitch: map.getPitch(),
  };
}

export const Map = forwardRef<MapRef, MapProps>(function Map(
  {
    children,
    className,
    theme: themeProp,
    styles,
    blank = false,
    projection,
    viewport,
    onViewportChange,
    loading = false,
    ...props
  },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const [pendingStyle, setPendingStyle] = useState<MapStyleOption | null>(null);
  const currentStyleRef = useRef<MapStyleOption | null>(null);
  const styleSwapInFlightRef = useRef(false);
  const internalUpdateRef = useRef(false);
  const resolvedTheme = useResolvedTheme(themeProp);

  const isControlled = viewport !== undefined && onViewportChange !== undefined;

  const onViewportChangeRef = useRef(onViewportChange);
  onViewportChangeRef.current = onViewportChange;

  const stableStyles = useStableValue(styles);

  const mapStyles = useMemo(() => {
    if (stableStyles) {
      return {
        dark: stableStyles.dark ?? defaultStyles.dark,
        light: stableStyles.light ?? defaultStyles.light,
      };
    }
    if (blank) {
      return { dark: blankMapStyle, light: blankMapStyle };
    }
    return defaultStyles;
  }, [stableStyles, blank]);

  useImperativeHandle(ref, () => mapInstance as MapLibreGL.Map, [mapInstance]);

  useEffect(() => {
    if (!containerRef.current) return;

    const initialStyle =
      resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    currentStyleRef.current = initialStyle;

    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: initialStyle,
      renderWorldCopies: false,
      attributionControl: {
        compact: true,
      },
      ...props,
      ...viewport,
    });

    const styleLoadHandler = () => {
      styleSwapInFlightRef.current = false;
      setIsStyleLoaded(true);
    };
    const loadHandler = () => setIsLoaded(true);

    const handleMove = () => {
      if (internalUpdateRef.current) return;
      onViewportChangeRef.current?.(getViewport(map));
    };

    map.on("load", loadHandler);
    map.on("style.load", styleLoadHandler);
    map.on("move", handleMove);
    setMapInstance(map);

    return () => {
      map.off("load", loadHandler);
      map.off("style.load", styleLoadHandler);
      map.off("move", handleMove);
      map.remove();
      setIsLoaded(false);
      setIsStyleLoaded(false);
      setMapInstance(null);
    };
  }, []);

  useEffect(() => {
    if (!mapInstance || !isControlled || !viewport) return;
    if (mapInstance.isMoving()) return;

    const current = getViewport(mapInstance);
    const next = {
      center: viewport.center ?? current.center,
      zoom: viewport.zoom ?? current.zoom,
      bearing: viewport.bearing ?? current.bearing,
      pitch: viewport.pitch ?? current.pitch,
    };

    if (
      next.center[0] === current.center[0] &&
      next.center[1] === current.center[1] &&
      next.zoom === current.zoom &&
      next.bearing === current.bearing &&
      next.pitch === current.pitch
    ) {
      return;
    }

    internalUpdateRef.current = true;
    mapInstance.jumpTo(next);
    internalUpdateRef.current = false;
  }, [mapInstance, isControlled, viewport]);

  useEffect(() => {
    if (!mapInstance || !resolvedTheme) return;

    const newStyle =
      resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;

    if (currentStyleRef.current === newStyle) return;

    currentStyleRef.current = newStyle;
    setIsStyleLoaded(false);
    setPendingStyle(newStyle);
  }, [mapInstance, resolvedTheme, mapStyles]);

  useEffect(() => {
    if (!mapInstance || !pendingStyle) return;

    setPendingStyle(null);
    styleSwapInFlightRef.current = true;
    mapInstance.setStyle(pendingStyle, { diff: false });
  }, [mapInstance, pendingStyle]);

  useEffect(() => {
    if (!mapInstance || !isStyleLoaded || !projection) return;
    if (styleSwapInFlightRef.current) return;
    mapInstance.setProjection(projection);
  }, [mapInstance, isStyleLoaded, projection]);

  const contextValue = useMemo(
    () => ({
      map: mapInstance,
      isLoaded: isLoaded && isStyleLoaded,
      resolvedTheme,
    }),
    [mapInstance, isLoaded, isStyleLoaded, resolvedTheme],
  );

  return (
    <MapContext.Provider value={contextValue}>
      <div
        ref={containerRef}
        className={cn("relative h-full w-full", className)}
      >
        {(!isLoaded || loading) && <DefaultLoader />}
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});
