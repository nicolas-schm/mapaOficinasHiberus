import { MapMarker, MarkerContent } from "@/components/ui/map";
import type { Oficina } from "@/types/office";
import pinHiberus from "@/assets/pinhiberus.svg";

type OfficeMarkersProps = {
  oficinas: Oficina[];
  onSelect: (oficina: Oficina) => void;
};

export function OfficeMarkers({ oficinas, onSelect }: OfficeMarkersProps) {
  return (
    <>
      {oficinas.map((oficina) => (
        <MapMarker
          key={oficina.id}
          longitude={oficina.longitude}
          latitude={oficina.latitude}
          anchor="bottom"
          ariaLabel={`Ver oficina de ${oficina.nombre ?? oficina.ciudad}`}
          onClick={() => onSelect(oficina)}
        >
          <MarkerContent>
            <img
              src={pinHiberus}
              alt=""
              className="h-9 w-auto drop-shadow-lg"
            />
          </MarkerContent>
        </MapMarker>
      ))}
    </>
  );
}
