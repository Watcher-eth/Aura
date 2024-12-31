import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~~/components/ui/carousel";
import { Card } from "~~/components/ui/card";

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
                <div className="w-full h-0 pb-[100%] relative">
                  <img
                    src={image}
                    alt={`Review image ${index + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-md"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
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