"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

// Get Images via props
interface iAppProps {
    images: string[];
}

export function ImageSlider({ images }: iAppProps) {

    const [mainImageIndex, setMainImageIndex] = useState(0);

    function handlePrevClick() {
        setMainImageIndex((prevIndex) => (
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        ))
    }

    function handleNextClick() {
        setMainImageIndex((prevIndex) => (
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        ))
    }

    function handleImageClick(index: number) {
        setMainImageIndex(index);
    }    

    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <div className="relative overflow-hidden rounded-lg">
                <Image
                    width={600}
                    height={600}
                    src={images[mainImageIndex]}
                    alt="Product image"
                    className="object-cover w-[600px] h-[600px]"
                />

                {/* Image Slider Buttons */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button 
                        variant="ghost" size="icon"
                        onClick={handlePrevClick}
                    >
                        <ChevronLeft
                            className="w-6 h-6"
                        />
                    </Button>
                    <Button 
                        variant="ghost" size="icon"
                        onClick={handleNextClick}
                    >
                        <ChevronRight
                            className="w-6 h-6"
                        />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {
                    images.map((image, index) => (
                        <div key={index}
                            onClick={() => handleImageClick(index)}
                            className={cn(
                                index === mainImageIndex
                                  ? "border-2 border-primary"
                                  : "border border-gray-200",
                                "relative overflow-hidden rounded-lg cursor-pointer"
                            )}
                        >
                            <Image 
                                src={image} alt="Product Images"
                                width={100} height={100}
                                className="object-cover w-[100px] h-[100px] rounded-lg"
                            />
                        </div>
                    ))
                }
            </div>
        </div>
    )
}