import { ChevronRight } from "lucide-react";
import { SidePanel } from "@/components/SidePanel";

export type PanelOficina = {
  id: string;
  ciudad: string;
  nombre?: string;
};

type CountryOfficesPanelProps = {
  pais: string;
  iso: string;
  oficinas: PanelOficina[];
  onSelectOficina: (id: string) => void;
  onClose: () => void;
};

export function CountryOfficesPanel({
  pais,
  iso,
  oficinas,
  onSelectOficina,
  onClose,
}: CountryOfficesPanelProps) {
  return (
    <SidePanel title={`Oficinas en ${pais}`} onClose={onClose}>
      <p className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
        Sede Hiberus
      </p>
      <h2 className="mt-1 flex items-center gap-2 text-3xl leading-tight font-black text-white">
        <span aria-hidden="true" className={`fi fi-${iso} rounded-sm shadow-sm`} />
        {pais}
      </h2>
      <p className="mt-1 text-sm font-normal text-white/70">
        {oficinas.length} {oficinas.length === 1 ? "oficina" : "oficinas"}
      </p>

      <div className="mt-6 flex flex-col gap-2">
        {oficinas.map((oficina) => (
          <button
            key={oficina.id}
            type="button"
            onClick={() => onSelectOficina(oficina.id)}
            className="flex cursor-pointer items-center justify-between gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2.5 text-left transition-colors hover:bg-white/10"
          >
            <span className="text-sm font-semibold text-white">
              {oficina.nombre ?? oficina.ciudad}
            </span>
            <ChevronRight className="size-4 shrink-0 text-sky-300" />
          </button>
        ))}
      </div>
    </SidePanel>
  );
}
