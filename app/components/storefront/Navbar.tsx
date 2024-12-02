import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import { UserDropdown } from "./UserDropdown";
import { Button } from "@/components/ui/button";
import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { redis } from "@/app/lib/redis";
import { Cart } from "@/app/lib/interfaces";

export async function Navbar() {

    // initialize kinde to get user session
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    // fetch cart data from redis
    const cart: Cart | null = await redis.get(`cart-${user?.id}`);

    const total = cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
    

    return (
        <nav className="sticky top-0 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between bg-white z-50">
            <div className="flex">

                {/* Site Logo */}
                <Link href="/">
                    <h1 className="text-gray-400 font-bold text-xl lg:text-4xl">
                        shop<span className="text-black">Lux</span>
                    </h1>
                </Link>

                <NavbarLinks />
            </div>

            <div className="flex items-center">
                {/* get user session to render login or register elements|components */}
                {
                    user ? (
                        <>
                            <Link href="/bag"
                                className="group p-2 flex items-center mr-2"
                            >
                                <ShoppingBag
                                    className="h-6 w-6 text-gray-400 group-hover:text-gray-600"
                                />
                                <span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-800">{total}</span>

                            </Link>
                            <UserDropdown 
                                email={user.email as string} 
                                name={user.given_name as string} 
                                userImage={user.picture ?? `https://avatar.vercel.sh/${user.given_name}`}
                            />
                        </>
                    ) : (
                        <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:space-x-2">
                            <Button asChild variant="secondary">
                                <LoginLink>Sign in</LoginLink>
                            </Button>
                            <span className="h-6 w-px bg-gray-200"></span>
                            <Button asChild>
                                <RegisterLink>Create Account</RegisterLink>
                            </Button>
                        </div>
                    )
                }
            </div>
        </nav>
    )
}