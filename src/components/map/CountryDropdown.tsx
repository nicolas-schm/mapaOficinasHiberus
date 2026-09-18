import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type CountryDropdownProps = {
  paises: { pais: string; iso: string }[];
  onSelect: (pais: string) => void;
};

export function CountryDropdown({ paises, onSelect }: CountryDropdownProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;

    optionRefs.current[0]?.focus();

    const handleClickOutside = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const handleListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = optionRefs.current.findIndex(
      (el) => el === document.activeElement,
    );
    if (e.key === "ArrowDown") {
      e.preventDefault();
      optionRefs.current[(currentIndex + 1) % paises.length]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      optionRefs.current[
        (currentIndex - 1 + paises.length) % paises.length
      ]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      optionRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      optionRefs.current[paises.length - 1]?.focus();
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Seleccionar país"
        className="flex cursor-pointer items-center gap-1 rounded-full border border-transparent bg-white px-3 py-1.5 text-xs font-bold text-[#141c6b] shadow-sm transition-colors hover:bg-white/90 sm:px-4 sm:py-1.5 sm:text-sm"
      >
        País
        <ChevronDown
          aria-hidden="true"
          className={cn("size-3.5 transition-transform", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="animate-in fade-in slide-in-from-top-1 absolute top-full left-0 z-20 mt-2 max-h-80 w-56 overflow-y-auto rounded-xl border border-white/10 bg-[#0a1440] p-1.5 shadow-lg duration-150">
          <p className="px-2.5 pt-1 pb-2 text-[10px] font-semibold tracking-widest text-white/70 uppercase">
            Selecciona un país
          </p>
          <div
            role="listbox"
            aria-label="Países disponibles"
            onKeyDown={handleListKeyDown}
          >
            {paises.map(({ pais, iso }, index) => (
              <button
                key={pais}
                ref={(el) => {
                  optionRefs.current[index] = el;
                }}
                type="button"
                role="option"
                aria-selected="false"
                onClick={() => {
                  setOpen(false);
                  onSelect(pais);
                }}
                className="flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-2 text-left text-sm font-medium text-white transition-colors hover:bg-white/10"
              >
                <span aria-hidden="true" className={`fi fi-${iso} rounded-sm`} />
                {pais}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
