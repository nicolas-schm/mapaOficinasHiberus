import { useEffect, useState } from "react";
import type { Map as MapLibreMap } from "maplibre-gl";
import type { Oficina } from "@/types/office";

export type OfficeCluster = {
  id: string;
  longitude: number;
  latitude: number;
  oficinas: Oficina[];
};

const CLUSTER_SPREAD_PX = 100;

export function useMarkerClusters(
  map: MapLibreMap | null,
  oficinas: Oficina[],
  getGroupKey: (oficina: Oficina) => string,
): OfficeCluster[] {
  const [clusters, setClusters] = useState<OfficeCluster[]>([]);

  useEffect(() => {
    if (!map) return;

    const compute = () => {
      const groups = new Map<string, Oficina[]>();
      for (const oficina of oficinas) {
        const key = getGroupKey(oficina);
        const group = groups.get(key);
        if (group) {
          group.push(oficina);
        } else {
          groups.set(key, [oficina]);
        }
      }

      const next: OfficeCluster[] = [];

      for (const [key, group] of groups) {
        if (group.length === 1) {
          const [oficina] = group;
          next.push({
            id: key,
            longitude: oficina.longitude,
            latitude: oficina.latitude,
            oficinas: group,
          });
          continue;
        }

        const points = group.map((oficina) =>
          map.project([oficina.longitude, oficina.latitude]),
        );
        const xs = points.map((p) => p.x);
        const ys = points.map((p) => p.y);
        const width = Math.max(...xs) - Math.min(...xs);
        const height = Math.max(...ys) - Math.min(...ys);
        const spread = Math.sqrt(width * width + height * height);

        if (spread <= CLUSTER_SPREAD_PX) {
          const centroid = group.reduce(
            (acc, oficina) => {
              acc.longitude += oficina.longitude;
              acc.latitude += oficina.latitude;
              return acc;
            },
            { longitude: 0, latitude: 0 },
          );
          centroid.longitude /= group.length;
          centroid.latitude /= group.length;

          next.push({
            id: key,
            longitude: centroid.longitude,
            latitude: centroid.latitude,
            oficinas: group,
          });
        } else {
          group.forEach((oficina) => {
            next.push({
              id: oficina.id,
              longitude: oficina.longitude,
              latitude: oficina.latitude,
              oficinas: [oficina],
            });
          });
        }
      }

      setClusters(next);
    };

    compute();
    map.on("move", compute);
    map.on("zoom", compute);

    return () => {
      map.off("move", compute);
      map.off("zoom", compute);
    };
  }, [map, oficinas, getGroupKey]);

  return clusters;
}
