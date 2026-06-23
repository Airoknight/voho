"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { cn, imagePath } from "../../lib/utils";
import { Menu, X, ArrowLeft } from "lucide-react";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
        <Link
            href={href}
            className={cn(
                "font-inter font-medium text-sm tracking-widest hover:text-accent transition-colors uppercase",
                pathname === href ? "text-accent border-b-2 border-accent" : ""
            )}
        >
            {children}
        </Link>
    );

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
                isScrolled || mobileMenuOpen || !isHome ? "bg-white text-primary py-1 shadow-sm" : "bg-transparent text-white py-6"
            )}
        >
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between relative">

                    {/* Left Nav (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-12 w-1/3 justify-end pr-12">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/booking">Booking</NavLink>
                    </nav>

                    {/* Center Logo */}
                    <div className="flex justify-center w-auto lg:w-1/3 z-10">
                        <Link href="/" className="block">
                            <Image
                                src={imagePath("/images/logo.png")}
                                alt="VOHO"
                                width={180}
                                height={60}
                                className={cn(
                                    "object-contain transition-all duration-300 w-auto",
                                    isScrolled || mobileMenuOpen || !isHome ? "h-14 brightness-100 invert-0" : "h-20 brightness-0 invert drop-shadow-md"
                                )}
                            />
                        </Link>
                    </div>

                    {/* Right Nav (Desktop) */}
                    <nav className="hidden lg:flex items-center gap-12 w-1/3 justify-start pl-12">
                        <NavLink href="/gallery">Gallery</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </nav>

                    {/* Mobile Toggle / Back */}
                    <div className="lg:hidden absolute right-0 flex items-center gap-4">

                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden absolute top-full left-0 w-full bg-white text-primary py-8 px-6 shadow-lg flex flex-col gap-6 items-center">
                        <NavLink href="/">Home</NavLink>
                        <NavLink href="/booking">Booking</NavLink>
                        <NavLink href="/gallery">Gallery</NavLink>
                        <NavLink href="/contact">Contact</NavLink>
                    </div>
                )}
            </div>
        </header>
    );
}
