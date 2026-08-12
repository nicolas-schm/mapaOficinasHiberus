export function BrandBadge() {
  return (
    <div className="absolute top-2 left-1/2 z-10 hidden -translate-x-1/2 sm:block">
      <div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-4 py-1.5 backdrop-blur-sm">
        <span className="text-xs font-bold tracking-widest text-sky-400 uppercase">
          Hiberus
        </span>
        <span className="text-xs text-white/50">·</span>
        <span className="text-xs font-medium tracking-widest text-white/90 uppercase">
          Presencia global
        </span>
      </div>
    </div>
  );
}
