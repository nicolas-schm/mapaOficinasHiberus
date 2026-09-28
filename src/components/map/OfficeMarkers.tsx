import { MapMarker, MarkerContent, useMap } from "@/components/ui/map";
import { useMarkerClusters } from "@/hooks/useMarkerClusters";
import { ORIGEN_INFO } from "@/data/oficinas";
import type { Oficina } from "@/types/office";
import pinHiberus from "@/assets/pinhiberus.svg";

function getOficinaPais(oficina: Oficina): string {
  return ORIGEN_INFO[oficina.id]?.pais ?? oficina.id;
}

type OfficeMarkersProps = {
  oficinas: Oficina[];
  onSelect: (oficina: Oficina) => void;
};

function clusterBounds(
  oficinas: Oficina[],
): [[number, number], [number, number]] {
  const longitudes = oficinas.map((oficina) => oficina.longitude);
  const latitudes = oficinas.map((oficina) => oficina.latitude);
  return [
    [Math.min(...longitudes), Math.min(...latitudes)],
    [Math.max(...longitudes), Math.max(...latitudes)],
  ];
}

export function OfficeMarkers({ oficinas, onSelect }: OfficeMarkersProps) {
  const { map } = useMap();
  const clusters = useMarkerClusters(map, oficinas, getOficinaPais);

  return (
    <>
      {clusters.map((cluster) => {
        const isCluster = cluster.oficinas.length > 1;

        const handleClick = () => {
          if (isCluster) {
            map?.fitBounds(clusterBounds(cluster.oficinas), {
              padding: 100,
              maxZoom: 12,
              duration: 800,
            });
            return;
          }
          onSelect(cluster.oficinas[0]);
        };

        return (
          <MapMarker
            key={cluster.id}
            longitude={cluster.longitude}
            latitude={cluster.latitude}
            anchor="bottom"
            ariaLabel={
              isCluster
                ? `${cluster.oficinas.length} oficinas en esta zona`
                : `Ver oficina de ${cluster.oficinas[0].nombre ?? cluster.oficinas[0].ciudad}`
            }
            onClick={handleClick}
          >
            <MarkerContent>
              <div className="relative">
                <img
                  src={pinHiberus}
                  alt=""
                  className="h-9 w-auto drop-shadow-lg"
                />
                {isCluster && (
                  <span className="absolute -top-1.5 -right-2 flex h-5 min-w-5 items-center justify-center rounded-full border-2 border-white bg-[#060a37] px-1 text-[11px] font-semibold text-white">
                    {cluster.oficinas.length}
                  </span>
                )}
              </div>
            </MarkerContent>
          </MapMarker>
        );
      })}
    </>
  );
}
