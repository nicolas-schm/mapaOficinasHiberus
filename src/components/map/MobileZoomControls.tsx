import { Minus, Plus } from "lucide-react";
import { useMap } from "@/components/ui/map";

export function MobileZoomControls() {
  const { map } = useMap();

  return (
    <div className="absolute right-4 bottom-4 z-10 flex flex-col gap-2 sm:hidden">
      <button
        type="button"
        onClick={() => map?.zoomTo(map.getZoom() + 1, { duration: 300 })}
        aria-label="Acercar"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#0d1a4f] text-white shadow-md"
      >
        <Plus className="size-4" />
      </button>
      <button
        type="button"
        onClick={() => map?.zoomTo(map.getZoom() - 1, { duration: 300 })}
        aria-label="Alejar"
        className="flex size-9 cursor-pointer items-center justify-center rounded-full bg-[#0d1a4f] text-white shadow-md"
      >
        <Minus className="size-4" />
      </button>
    </div>
  );
}
