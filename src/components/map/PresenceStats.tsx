type PresenceStatsProps = {
  total: number;
};

export function PresenceStats({ total }: PresenceStatsProps) {
  return (
    <>
      <div className="absolute top-2 right-2 z-10 sm:hidden">
        <div className="flex items-center gap-1.5 rounded-full bg-[#0d1a4f] px-3 py-1.5 shadow-sm">
          <span className="text-base leading-none font-bold text-white">
            {total}
          </span>
          <span className="text-[10px] leading-none font-semibold tracking-widest text-sky-300 uppercase">
            Sedes
          </span>
        </div>
      </div>
      <div className="absolute right-6 bottom-6 z-10 hidden text-right sm:block">
        <p className="text-xs font-semibold tracking-widest text-sky-400 uppercase">
          Presencia en todo el mundo
        </p>
        <p className="text-5xl leading-tight font-bold text-white">{total}</p>
        <p className="text-sm text-white/80">Sedes</p>
      </div>
    </>
  );
}
