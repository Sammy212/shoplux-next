import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Get Images via props
interface iAppProps {
    images: string[];
}

export function ImageSlider({ images }: iAppProps) {
    return (
        <div className="grid gap-6 md:gap-3 items-start">
            <div className="relative overflow-hidden rounded-lg">
                <Image 
                    src={images[0]} alt="Product Images" 
                    width={600} height={600}
                    className="object-cover rounded-xl h-[600px] w-[600px]"
                />

                {/* Image Slider Buttons */}
                <div className="absolute inset-0 flex items-center justify-between px-4">
                    <Button variant="ghost" size="icon">
                        <ChevronLeft
                            className="w-6 h-6"
                        />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <ChevronRight
                            className="w-6 h-6"
                        />
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-5 gap-4">
                {
                    images.map((image, index) => (
                        <div key={index}>
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