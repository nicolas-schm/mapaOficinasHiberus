import { Globe, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoGallery } from "@/components/PhotoGallery";
import { SidePanel } from "@/components/SidePanel";
import { getClientLogos } from "@/lib/clientLogos";

export type OficinaMeta = {
  pais: string;
  iso: string;
  region: string;
};

export type SidebarOficina = {
  ciudad: string;
  nombre?: string;
  direccion: string;
  telefono?: string;
  web?: string;
  fotos: string[];
};

type OfficeSidebarProps = {
  oficina: SidebarOficina | null;
  meta: OficinaMeta | null;
  onClose: () => void;
  closable?: boolean;
};

function InfoRow({
  icon,
  label,
  value,
  wrap = false,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  wrap?: boolean;
  href?: string;
}) {
  const valueClassName = cn(
    "text-sm font-normal text-white",
    wrap ? "" : "truncate",
    href && "hover:underline",
  );

  return (
    <div className="flex items-center gap-3 rounded-lg border border-white/5 bg-white/5 px-3 py-2.5">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-sky-500/20 text-sky-300">
        {icon}
      </div>
      <div className="flex flex-col overflow-hidden">
        <span className="text-[10px] font-semibold tracking-widest text-white/70 uppercase">
          {label}
        </span>
        {href ? (
          <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className={valueClassName}
          >
            {value}
          </a>
        ) : (
          <span className={valueClassName}>{value}</span>
        )}
      </div>
    </div>
  );
}

export function OfficeSidebar({
  oficina,
  meta,
  onClose,
  closable = true,
}: OfficeSidebarProps) {
  if (!oficina || !meta) return null;

  const titulo = oficina.nombre ?? oficina.ciudad;
  const clientLogos = getClientLogos(meta.pais);

  return (
    <SidePanel
      title={`Sede Hiberus en ${titulo}`}
      onClose={onClose}
      closable={closable}
    >
      <p className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
        Sede Hiberus
      </p>
      <h2 className="mt-1 text-3xl leading-tight font-black text-white">
        {titulo}
      </h2>
      <p className="mt-1 flex items-center gap-2 text-base font-semibold text-white">
        <span aria-hidden="true" className={`fi fi-${meta.iso} rounded-sm shadow-sm`} />
        {meta.pais}
      </p>

      <div className="mt-6 flex flex-col gap-2">
        <InfoRow
          icon={<MapPin className="size-4" />}
          label="Ubicación"
          value={oficina.direccion}
          wrap
        />
        {oficina.telefono && (
          <InfoRow
            icon={<Phone className="size-4" />}
            label="Teléfono"
            value={oficina.telefono}
          />
        )}
      </div>

      {oficina.web && (
        <a
          href={oficina.web}
          target="_blank"
          rel="noreferrer"
          className="mt-2 flex items-center justify-center gap-2 rounded-lg bg-[#1B3AC7] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:brightness-110"
        >
          <Globe className="size-4" />
          Conocer más
        </a>
      )}

      {oficina.fotos.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-[10px] font-semibold tracking-widest text-white/70 uppercase">
            Galería
          </p>
          <PhotoGallery photos={oficina.fotos} />
        </div>
      )}

      {clientLogos.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-[11px] font-bold tracking-widest text-sky-400 uppercase">
            Nuestros clientes
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {clientLogos.map((logo) => (
              <img
                key={logo.src}
                src={logo.src}
                alt={logo.name}
                className="h-6 w-auto object-contain opacity-90 brightness-0 invert"
              />
            ))}
          </div>
        </div>
      )}
    </SidePanel>
  );
}
