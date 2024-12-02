import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { Button } from "@/components/ui/button";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OctagonX } from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";

export default async function BagRoute() {

    // Check user auth
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    // Redirect if not signedin
    if(!user) {
        redirect("/");
    }

    // fetch cart data from Redis
    const cart: Cart | null = await redis.get(`cart-${user.id}`);

    // calsulate total cart price
    let totalPrice = 0;
    cart?.items.forEach((item) => {
        totalPrice += item.price * item.quantity;
    });
    
    return (
        <div className="max-w-2xl mx-auto mt-10 mb-10">
            {
                cart?.items.length === 0 ? (
                    <div className="fle">
                        <h1>Your shopping bag is empty</h1>
                    </div>
                ): (
                    <div className="flex flex-col gap-y-10">
                        {
                            cart?.items.map((item) => (
                                <div 
                                    className="flex"
                                    key={item.id}
                                >
                                    <div className="w-24 h-24 sm:h-32 relative">
                                        <Image
                                            src={item.imageString} alt="Product Image"
                                            fill
                                            className="rounded-md object-cover"
                                        />
                                    </div>

                                    <div className="ml-5 flex justify-between w-full font-medium">
                                        <p className="fle">{item.name}</p>

                                        <div className="flex flex-col h-full justify-between">
                                            <div className="flex items-center gap-2">
                                                <p className="fle">{item.quantity} x</p>
                                                <p className="fle">₦{item.price.toLocaleString()}</p>
                                            </div>

                                            <p className="font-medium text-primary text-end flex justify-end items-center gap-1 hover:text-gray-300 cursor-pointer">
                                                <OctagonX 
                                                    className="w-4 h-4"
                                                />
                                                Delete
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        <div className="mt-10">
                            <div className="flex items-center justify-between font-medium">
                                <p>Subtotal:</p>
                                <p>₦{totalPrice.toLocaleString()}</p>
                            </div>

                            <Button
                                size="lg" className="w-full mt-5"
                            >
                                <MdOutlineShoppingCartCheckout />
                                Checkout
                            </Button>
                        </div>
                    </div>
                )
            }
        </div>
    )
};
