import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

type PhotoGalleryProps = {
  photos: string[];
  className?: string;
};

export function PhotoGallery({ photos, className }: PhotoGalleryProps) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);
  const next = () => setIndex((i) => (i + 1) % photos.length);

  if (photos.length === 0) return null;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative aspect-video overflow-hidden rounded-md bg-muted">
        <img
          src={photos[index]}
          alt={`Foto ${index + 1} de ${photos.length}`}
          className="h-full w-full object-cover"
        />
        {photos.length > 1 && (
          <>
            <button
              type="button"
              onClick={prev}
              aria-label="Foto anterior"
              className="absolute top-1/2 left-1 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Foto siguiente"
              className="absolute top-1/2 right-1 flex size-6 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
            >
              <ChevronRight className="size-4" />
            </button>
          </>
        )}
      </div>
      {photos.length > 1 && (
        <div className="mt-1.5 flex justify-center gap-1">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Ir a foto ${i + 1}`}
              className={cn(
                "size-1.5 rounded-full transition-colors",
                i === index ? "bg-foreground" : "bg-muted-foreground/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
