import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type TouchEvent,
} from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

const SWIPE_THRESHOLD = 30;

type SidePanelProps = {
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export function SidePanel({ title, onClose, children }: SidePanelProps) {
  const [expanded, setExpanded] = useState(false);
  const touchStartYRef = useRef<number | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    panelRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      tabIndex={-1}
      className={cn(
        "animate-in slide-in-from-bottom fade-in fixed inset-x-0 bottom-0 z-20 rounded-t-2xl border-t border-white/10 bg-gradient-to-b from-[#0a1440]/97 to-[#050a24]/97 p-6 pt-3 backdrop-blur-md duration-300 outline-none sm:slide-in-from-left sm:inset-y-0 sm:right-auto sm:bottom-auto sm:h-full sm:w-[507px] sm:rounded-none sm:rounded-tl-none sm:border-t-0 sm:border-r sm:pt-6 sm:overflow-y-auto",
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
        className="absolute top-2 right-2 flex size-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="size-4" />
      </button>

      {children}
    </div>
  );
}
