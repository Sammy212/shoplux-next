import Link from "next/link";
import { NavbarLinks } from "./NavbarLinks";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { ShoppingBag } from "lucide-react";
import { UserDropdown } from "./UserDropdown";

export async function Navbar() {

    // initialize kinde to get user session
    const {getUser} = getKindeServerSession();
    const user = await getUser();

    return (
        <nav className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
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
                                <span className="ml-2 text-sm font-medium text-gray-400 group-hover:text-gray-800">5</span>

                            </Link>
                            <UserDropdown/>
                        </>
                    ) : (
                        <h1>Not authenticated</h1>
                    )
                }
            </div>
        </nav>
    )
}