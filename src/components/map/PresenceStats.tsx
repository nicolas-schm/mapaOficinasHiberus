type PresenceStatsProps = {
  total: number;
};

export function PresenceStats({ total }: PresenceStatsProps) {
  return (
    <div className="absolute right-6 bottom-6 z-10 text-right">
      <p className="text-xs font-semibold tracking-widest text-sky-400 uppercase">
        Presencia en todo el mundo
      </p>
      <p className="text-5xl leading-tight font-bold text-white">{total}</p>
      <p className="text-sm text-white/80">Sedes</p>
    </div>
  );
}
