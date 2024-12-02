import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface iAppProps {
    item: {
        id: string;
        name: string;
        description: string;
        price: number;
        images: string[];
    };
}

export function ProductCard({ item }: iAppProps) {
    return (
        <div className="rounded-lg">
            <Carousel className="w-full mx-auto"
                opts={{ loop: true }}
            >
                <CarouselContent>
                    {
                        item.images.map((item, index) => (
                            <CarouselItem key={index}>
                                <div className="relative h-[330px]">
                                    <Image 
                                        src={item} alt="Product Image" fill
                                        className="object-cover object-center w-full h-full rounded-lg"
                                    />
                                </div>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="ml-16 opacity-20"/>
                <CarouselNext className="mr-16 opacity-20"/>
            </Carousel>

            <div className="flex justify-between items-center mt-2">
                <h1 className="font-semibold text-lg">{item.name}</h1>
                <h3 className="inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/10">
                    ₦{item.price.toLocaleString()}
                </h3>
            </div>
            <p className="text-gray-600 text-sm mt-2 text-justify line-clamp-2 px-2">{item.description}</p>
            <div className="flex mt-5 justify-between">
                <Button variant="outline" asChild><Link href={`/product/${item.id}`}>View Product</Link></Button>

                <Button asChild>
                    <Link href={`/product/${item.id}`}><ShoppingBag className="mr-1 h-5 w-5"/> Add to Bag</Link>
                </Button>
            </div>
        </div>
    )
}