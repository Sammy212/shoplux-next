import Link from "next/link";
import { Link2 } from "lucide-react";

export function Footer() {
    return (
        <footer className="mt-16 mb-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                <p className="text-xs leading-5 text-gray-700">&copy; shopLux 2024</p>
                <Link href="/dashboard" target="_blank" 
                    className="text-sm text-black font-bold hover:text-gray-400"
                >
                    View admin dashboard
                </Link>
                <p className="text-sm leading-5 text-gray-700 flex gap-2">
                     Created by 
                    <a href="https://samuel-afolabi.netlify.app/" 
                        target="_blank" 
                        className="flex justify-center items-center gap-1 text-sm text-black font-bold hover:text-gray-400"
                    >
                        &nbsp;Samuel Afolabi
                        <Link2 
                            className="w-3 h-3"
                        /> 
                    </a>
                </p>
            </div>

        </footer>
    )
}