import { useRef, useState, type TouchEvent } from "react";
import { Globe, Mail, MapPin, X, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { PhotoGallery } from "@/components/PhotoGallery";
import { getClientLogos } from "@/lib/clientLogos";

const CLIENT_LOGOS = getClientLogos();

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
};

const SWIPE_THRESHOLD = 30;

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
        <span className="text-[10px] font-semibold tracking-widest text-white/40 uppercase">
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

export function OfficeSidebar({ oficina, meta, onClose }: OfficeSidebarProps) {
  const [expanded, setExpanded] = useState(false);
  const touchStartYRef = useRef<number | null>(null);

  if (!oficina || !meta) return null;

  const titulo = oficina.nombre ?? oficina.ciudad;

  const handleTouchStart = (e: TouchEvent) => {
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (touchStartYRef.current == null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    if (deltaY < -SWIPE_THRESHOLD) setExpanded(true);
    else if (deltaY > SWIPE_THRESHOLD) setExpanded(false);
    touchStartYRef.current = null;
  };

  return (
    <div
      className={cn(
        "animate-in slide-in-from-bottom fade-in fixed inset-x-0 bottom-0 z-20 rounded-t-2xl border-t border-white/10 bg-gradient-to-b from-[#0a1440]/97 to-[#050a24]/97 p-6 pt-3 backdrop-blur-md duration-300 sm:slide-in-from-left sm:inset-y-0 sm:right-auto sm:bottom-auto sm:h-full sm:w-[507px] sm:rounded-none sm:rounded-tl-none sm:border-t-0 sm:border-r sm:pt-6 sm:overflow-y-auto",
        "max-h-[175px] transition-[max-height] duration-300 ease-out sm:max-h-none",
        expanded ? "max-h-[85vh] overflow-y-auto" : "overflow-hidden",
      )}
    >
      <div
        onClick={() => setExpanded((v) => !v)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="-mx-6 -mt-3 mb-3 flex cursor-pointer justify-center pt-3 pb-1 sm:hidden"
      >
        <span className="h-1 w-10 rounded-full bg-white/25" />
      </div>

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
      <h2 className="mt-1 text-3xl leading-tight font-thin text-white">
        {titulo}
      </h2>
      <p className="mt-1 flex items-center gap-2 text-base font-semibold text-white">
        <span className={`fi fi-${meta.iso} rounded-sm shadow-sm`} />
        {meta.pais}
      </p>

      {/* <span className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sky-400/40 bg-sky-400/10 px-3 py-1 text-[11px] font-semibold tracking-wide text-sky-300 uppercase">
        <span className="size-1.5 rounded-full bg-sky-400" />
        Oficina activa
      </span> */}

      <div className="mt-6 flex flex-col gap-2">
        <InfoRow
          icon={<MapPin className="size-4" />}
          label="Ubicación"
          value={oficina.direccion}
          wrap
        />
        {/* <InfoRow
          icon={<Globe2 className="size-4" />}
          label="Región"
          value={meta.region}
        /> */}
        <InfoRow
          icon={<Mail className="size-4" />}
          label="Contacto"
          value="info@hiberus.com"
        />
        {oficina.telefono && (
          <InfoRow
            icon={<Phone className="size-4" />}
            label="Teléfono"
            value={oficina.telefono}
          />
        )}
        {oficina.web && (
          <InfoRow
            icon={<Globe className="size-4" />}
            label="Web"
            value={oficina.web}
            href={oficina.web}
          />
        )}
      </div>

      {oficina.fotos.length > 0 && (
        <div className="mt-6">
          <p className="mb-2 text-[10px] font-semibold tracking-widest text-white/40 uppercase">
            Galería
          </p>
          <PhotoGallery photos={oficina.fotos} />
        </div>
      )}

      {CLIENT_LOGOS.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-[11px] font-bold tracking-widest text-sky-400 uppercase">
            Nuestros clientes
          </p>
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            {CLIENT_LOGOS.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt=""
                className="h-6 w-auto object-contain opacity-90 brightness-0 invert"
              />
            ))}
          </div>
        </div>
      )}

      <hr className="my-6 border-white/10" />

      <p className="text-[11px] font-bold tracking-widest text-sky-400 uppercase">
        El equipo que nos hace
      </p>
      <p className="mt-1 text-2xl font-semibold text-white">#WeAreDifferent</p>
      <div className="mt-3 h-0.5 w-full bg-gradient-to-r from-sky-400 to-transparent" />
    </div>
  );
}
