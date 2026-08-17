import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_PHOTOS = 6;
const SCROLL_END_THRESHOLD = 4;

type PhotoGalleryProps = {
  photos: string[];
  className?: string;
};

export function PhotoGallery({ photos, className }: PhotoGalleryProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  if (photos.length === 0) return null;

  const visiblePhotos = photos.slice(0, MAX_PHOTOS);

  const updateScrollState = () => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    setAtStart(scroller.scrollLeft <= SCROLL_END_THRESHOLD);
    setAtEnd(
      scroller.scrollLeft + scroller.clientWidth >=
        scroller.scrollWidth - SCROLL_END_THRESHOLD,
    );
  };

  const scrollByPage = (direction: 1 | -1) => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    scroller.scrollBy({
      left: direction * scroller.clientWidth * 0.9,
      behavior: "smooth",
    });
  };

  return (
    <div className={cn("relative", className)}>
      <div
        ref={scrollerRef}
        onScroll={updateScrollState}
        className="flex snap-x snap-mandatory gap-1.5 overflow-x-auto scroll-smooth [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {visiblePhotos.map((photo, i) => (
          <div
            key={photo}
            className="aspect-square w-[31%] shrink-0 snap-start overflow-hidden rounded-md bg-muted"
          >
            <img
              src={photo}
              alt={`Foto ${i + 1} de ${visiblePhotos.length}`}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
      {visiblePhotos.length > 3 && !atStart && (
        <button
          type="button"
          onClick={() => scrollByPage(-1)}
          aria-label="Fotos anteriores"
          className="absolute top-1/2 left-1 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <ChevronLeft className="size-4" />
        </button>
      )}
      {visiblePhotos.length > 3 && !atEnd && (
        <button
          type="button"
          onClick={() => scrollByPage(1)}
          aria-label="Más fotos"
          className="absolute top-1/2 right-1 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
        >
          <ChevronRight className="size-4" />
        </button>
      )}
    </div>
  );
}
