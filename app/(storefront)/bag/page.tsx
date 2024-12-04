import { checkOut, removeItem } from "@/app/actions";
import { ChceckoutButton, DeleteItem } from "@/app/components/SubmitButtons";
import { Cart } from "@/app/lib/interfaces";
import { redis } from "@/app/lib/redis";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { OctagonX, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

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
                !cart || !cart.items ? (
                    <div className="flex min-h-[55vh] flex-col items-center justify-center rounded-lg border-dashed p-8 text-center mt-20">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                            <ShoppingBag
                                className="w-10 h-10 text-primary"
                            />
                        </div>
                        <h1
                            className="mt-6 text-xl font-bold"
                        >
                            Your shopping bag is empty <br />
                            <Link href="/products/all"
                                className="text-sm font-normal hover:text-gray-300"
                            >
                                Add items
                            </Link>
                        </h1>
                    </div>
                ): (
                    <div className="flex flex-col gap-y-10">
                        <p>Please use this&nbsp; 
                            <a href="https://drive.google.com/file/d/1XzmAE-_udPUrTgAPieTTVComnNCmdNnu/view?usp=sharing" target="_blank" className="text-black font-semibold underline hover:text-gray-300 cursor-pointer">
                             test card</a> to checkout&nbsp;
                            <a href="https://docs.stripe.com/testing" target="_blank" className="text-black font-semibold underline hover:text-gray-300 cursor-pointer">view stripe docs</a>
                        </p>
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
                                                <p className="fle">{item.quantity} X</p>
                                                <p className="fle">₦{item.price.toLocaleString()}</p>
                                            </div>

                                            
                                            <form action={removeItem}
                                                className="flex justify-end items-center gap-1 hover:text-gray-300 cursor-pointer"
                                            >
                                                <input type="hidden" name="productId"  value={item.id} />
                                                <OctagonX 
                                                    className="w-4 h-4"
                                                />
                                                <DeleteItem/>
                                            </form>
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

                            <form action={checkOut}>
                                <ChceckoutButton/>
                            </form>
                        </div>
                    </div>
                )
            }
        </div>
    )
};
