export function MapHint() {
  return (
    <>
      <p className="absolute top-12 right-2 left-2 z-10 text-center text-[9px] font-semibold tracking-widest text-white/50 uppercase sm:hidden">
        Arrastra para rotar · Scroll para zoom · Click en un punto
      </p>
      <p className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 text-xs font-semibold tracking-widest text-white/50 uppercase sm:block">
        Arrastra para rotar · Scroll para zoom · Click en un punto
      </p>
    </>
  );
}
