import { MapMarker, MarkerContent } from "@/components/ui/map";
import type { Oficina } from "@/types/office";

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
          onClick={() => onSelect(oficina)}
        >
          <MarkerContent />
        </MapMarker>
      ))}
    </>
  );
}
