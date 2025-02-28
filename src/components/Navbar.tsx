"use client"
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-center">
                    <Link href="/" className="text-lg font-medium text-white">
                        Pokemon
                    </Link>
                </div>
            </div>
        </nav>
    );
}
export default Navbar