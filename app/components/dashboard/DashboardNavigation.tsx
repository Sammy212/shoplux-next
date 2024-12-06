"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    {
        name: "Dashboard",
        href: "/dashboard",
    },
    {
        name: "Orders",
        href: "/dashboard/orders",
    },
    {
        name: "Products",
        href: "/dashboard/products",
    },
    {
        name: "Banner Pictures",
        href: "/dashboard/banner",
    },
    {
        name: "View Storefront",
        href: "/",
    },
]

export default function DashboardNavigation() {

    const pathname = usePathname();
    return (
        <>
            {links.map((link) => (
                <Link key={link.href} href={link.href} 
                    className={cn(
                        link.href === pathname 
                        ? "text-black" 
                        : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    {link.name}
                </Link>
            ))}
        </>
    )
};
