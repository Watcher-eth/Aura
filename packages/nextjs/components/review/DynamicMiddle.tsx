import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~~/components/ui/carousel";
import { Card } from "~~/components/ui/card";
import Image from "next/image";
import { AspectRatio } from "~~/components/ui/aspect-ratio";

interface DynamicMiddleProps {
  images: string[];
}

function DynamicMiddle({ images }: DynamicMiddleProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full px-4 py-6">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full max-w-4xl mx-auto"
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Card className="overflow-hidden">
                <AspectRatio ratio={1}>
                  <Image
                    src={image}
                    alt={`Review image ${index + 1}`}
                    fill
                    className="object-cover rounded-md"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                </AspectRatio>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </div>
  );
}

export default DynamicMiddle;