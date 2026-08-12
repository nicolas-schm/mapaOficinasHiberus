export function BrandBadge() {
  return (
    <div className="absolute top-14 left-1/2 z-10 -translate-x-1/2 sm:top-2">
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 backdrop-blur-sm sm:px-4 sm:py-1.5">
        <span className="text-[10px] font-bold tracking-widest text-sky-400 uppercase sm:text-xs">
          Hiberus
        </span>
        <span className="text-[10px] text-white/50 sm:text-xs">·</span>
        <span className="text-[10px] font-medium tracking-widest text-white/90 uppercase sm:text-xs">
          Presencia global
        </span>
      </div>
    </div>
  );
}
