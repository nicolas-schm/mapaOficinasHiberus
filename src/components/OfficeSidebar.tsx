import { Globe2, Mail, MapPin, X } from "lucide-react";
import { PhotoGallery } from "@/components/PhotoGallery";

export type OficinaMeta = {
  pais: string;
  iso: string;
  region: string;
};

export type SidebarOficina = {
  ciudad: string;
  nombre?: string;
  fotos: string[];
};

type OfficeSidebarProps = {
  oficina: SidebarOficina | null;
  meta: OficinaMeta | null;
  onClose: () => void;
};

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sky-500/20 text-sky-300">
        {icon}
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
          {label}
        </span>
        <span className="truncate text-sm text-white">{value}</span>
      </div>
    </div>
  );
}

export function OfficeSidebar({ oficina, meta, onClose }: OfficeSidebarProps) {
  if (!oficina || !meta) return null;

  const titulo = oficina.nombre ?? oficina.ciudad;

  return (
    <div className="animate-in slide-in-from-left fade-in absolute top-0 left-0 z-20 h-full w-full overflow-y-auto border-r border-white/10 bg-gradient-to-b from-[#0a1440]/97 to-[#050a24]/97 p-6 backdrop-blur-md duration-300 sm:w-[507px]">
      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar"
        className="absolute top-4 right-4 flex size-7 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-3.5" />
      </button>

      <p className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
        Sede Hiberus
      </p>
      <h2 className="mt-1 text-3xl leading-tight font-bold text-white">
        {titulo}
      </h2>
      <p className="mt-1 flex items-center gap-2 text-base font-semibold text-white">
        <span className={`fi fi-${meta.iso} rounded-sm shadow-sm`} />
        {meta.pais}
      </p>

      <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-sky-300 uppercase">
        <span className="size-1.5 rounded-full bg-sky-400" />
        Oficina activa
      </span>

      <div className="mt-6 flex flex-col gap-2">
        <InfoRow
          icon={<MapPin className="size-4" />}
          label="Ubicación"
          value={`${oficina.ciudad}, ${meta.pais}`}
        />
        <InfoRow
          icon={<Globe2 className="size-4" />}
          label="Región"
          value={meta.region}
        />
        <InfoRow
          icon={<Mail className="size-4" />}
          label="Contacto"
          value="info@hiberus.com"
        />
      </div>

      <div className="mt-6">
        <p className="mb-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
          Galería
        </p>
        <PhotoGallery photos={oficina.fotos} />
      </div>

      <hr className="my-6 border-white/10" />

      <p className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
        El equipo que nos hace
      </p>
      <p className="mt-1 text-2xl font-bold text-white">#WeAreDifferent</p>
      <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-sky-400 to-transparent" />
    </div>
  );
}
