type PresenceStatsProps = {
  total: number;
};

export function PresenceStats({ total }: PresenceStatsProps) {
  return (
    <div className="absolute right-4 bottom-4 z-10 text-right sm:right-6 sm:bottom-6">
      <p className="text-[10px] font-semibold tracking-widest text-sky-400 uppercase sm:text-xs">
        Presencia en todo el mundo
      </p>
      <p className="text-3xl leading-tight font-bold text-white sm:text-5xl">
        {total}
      </p>
      <p className="text-xs text-white/80 sm:text-sm">Sedes</p>
    </div>
  );
}
