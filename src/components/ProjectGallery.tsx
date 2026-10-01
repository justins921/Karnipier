"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
}

export default function ProjectGallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % images.length));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + images.length) % images.length));
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length]);

  const navBtn =
    "absolute top-1/2 -translate-y-1/2 text-white text-4xl px-4 py-2 hover:bg-white/10 rounded-lg";

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((img, index) => (
          <button
            key={img.src}
            type="button"
            onClick={() => setOpen(index)}
            className="overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-lake"
            aria-label={`View larger: ${img.alt}`}
          >
            <Image
              src={img.src}
              alt={img.alt}
              width={600}
              height={400}
              className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
              loading={index < 6 ? "eager" : "lazy"}
            />
          </button>
        ))}
      </div>

      {open !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label={images[open].alt}
          onClick={() => setOpen(null)}
        >
          <div className="relative w-full h-full max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[open].src}
              alt={images[open].alt}
              fill
              sizes="100vw"
              className="object-contain"
            />
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open - 1 + images.length) % images.length);
            }}
            className={`${navBtn} left-2`}
            aria-label="Previous photo"
          >
            &lsaquo;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen((open + 1) % images.length);
            }}
            className={`${navBtn} right-2`}
            aria-label="Next photo"
          >
            &rsaquo;
          </button>
          <button
            type="button"
            onClick={() => setOpen(null)}
            className="absolute top-4 right-4 text-white text-3xl px-3 hover:bg-white/10 rounded-lg"
            aria-label="Close"
          >
            &times;
          </button>
        </div>
      )}
    </>
  );
}
