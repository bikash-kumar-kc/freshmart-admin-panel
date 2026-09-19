"use client";

import { useState } from "react";
import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import "yet-another-react-lightbox/styles.css";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/components/ui/carousel";
import { Expand } from "lucide-react";

export const cauroselArrowStyle =
  "hover:bg-green-200 border hover:border-green-500 text-black transition-colors";

export function CertificateGallery({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  if (images.length === 0) return null;

  return (
    <div className="bg-statcard-background border border-statcard-border rounded-sm p-5">
      <h3 className="text-sm font-semibold text-app-foreground mb-4">
        {title}
      </h3>

      <Carousel className="w-full max-w-md mx-auto sm:mx-0">
        <CarouselContent>
          {images.map((src, index) => (
            <CarouselItem key={src + index}>
              <div
                onClick={() => {
                  setStartIndex(index);
                  setLightboxOpen(true);
                }}
                className="group relative aspect-video rounded-sm overflow-hidden border border-app-border cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`${title} ${index + 1}`}
                  fill
                  className="object-cover brightness-50 hover:brightness-100 transition-all"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <Expand
                    size={22}
                    className="text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className={`${cauroselArrowStyle} left-2`} />
            <CarouselNext className={`${cauroselArrowStyle} right-2`} />
          </>
        )}
      </Carousel>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={startIndex}
        slides={images.map((src) => ({ src }))}
        plugins={[Zoom, Fullscreen]}
      />
    </div>
  );
}
