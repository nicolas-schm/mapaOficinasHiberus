import { cn } from "@/lib/utils";
import type { Region } from "@/types/office";

type RegionSwitcherProps = {
  regiones: Region[];
  activeRegionId: string | null;
  onSelect: (region: Region) => void;
};

export function RegionSwitcher({
  regiones,
  activeRegionId,
  onSelect,
}: RegionSwitcherProps) {
  return (
    <>
      {regiones.map((region) => (
        <button
          key={region.id}
          type="button"
          onClick={() => onSelect(region)}
          className={cn(
            "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-normal shadow-sm transition-colors sm:px-4 sm:py-1.5 sm:text-sm",
            activeRegionId === region.id
              ? "border-sky-400 bg-[#0d1a4f] text-white"
              : "border-transparent bg-white text-[#141c6b] hover:bg-white/90",
          )}
        >
          {region.label}
        </button>
      ))}
    </>
  );
}
