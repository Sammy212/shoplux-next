import { FeaturedProduct } from "@/app/components/storefront/FeaturedProducts";
import { ImageSlider } from "@/app/components/storefront/ImageSlider";
import prisma from "@/app/lib/db"
import { Button } from "@/components/ui/button";
import { ShoppingBag, StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

async function getData(productId: string) {
    const data = await prisma.product.findUnique({
        where: {
            id: productId,
        },
        select: {
            id: true,
            name: true,
            price: true,
            images: true,
            description: true,
        },
    });

    if(!data) {
        return notFound();
    }

    return data;
}

export default async function ProductPage({
    params,
}: {params: {id: string}
}) {

    const data = await getData(params.id);
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start lg:gap-x-24 py-6">
                <ImageSlider images={data.images}/>
                <div>
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                        {data.name}
                    </h1>
                    <p className="mt-2 text-3xl text-gray-900">₦{data.price.toLocaleString()}</p>

                    {/* Product Ratings */}
                    <div className="mt-3 flex items-center gap-1">
                        <StarIcon
                            className="h-4 w-4 text-black fill-black"
                        />
                        <StarIcon
                            className="h-4 w-4 text-black fill-black"
                        />
                        <StarIcon
                            className="h-4 w-4 text-black fill-black"
                        />
                        <StarIcon
                            className="h-4 w-4 text-black fill-black"
                        />
                        <StarIcon
                            className="h-4 w-4 text-black"
                        />
                    </div>

                    {/* Description */}
                    <p className="text-base text-gray-500 mt-12 text-justify">{data.description}</p>

                    <Button size="lg" className="w-full mt-16">
                        <ShoppingBag className="mr-4 h-5 w-5"/> Add to Bag
                    </Button>
                </div>
            </div>

            {/* Featured Products */}
            <div className="mt-16">
                <FeaturedProduct/>
            </div>
        </>
    )
};