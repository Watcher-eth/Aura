import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "~~/components/ui/carousel";
import { Card } from "~~/components/ui/card";

interface DynamicERC721MiddleProps {
  images: string[];
}

interface DynamicERC20MiddleProps {
  prices: number[];
}
interface DynamicMiddleProps {
  image: string;
}

function DynamicMiddle({ images }: DynamicERC721MiddleProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full  py-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full  mx-auto"
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

export function ERC721Middle ({ images }: DynamicERC721MiddleProps) {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="w-full  py-8">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full  mx-auto"
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

export function ERC20Middle ({ prices }: DynamicERC20MiddleProps) {

  return (
    <div className="w-full  py-10">
     //Chart
    </div>
  );
}

export function FeaturedAppMiddle ({ image }: DynamicMiddleProps) {

  return (
    <img src={image} className="w-full h-[25vh] rounded-md  py-10"/>
  );
}