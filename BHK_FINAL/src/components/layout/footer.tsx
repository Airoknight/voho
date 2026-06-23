import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Youtube, Twitter, MapPin, Phone, Mail } from "lucide-react";
import { imagePath } from "../../lib/utils";

export function Footer() {
    return (
        <footer className="bg-[#0F2822] text-white pt-24 pb-0 relative overflow-hidden rounded-t-[60px]">
            <div className="container mx-auto px-4 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">

                    {/* Left: Contact Us (Span 5) */}
                    <div className="lg:col-span-5 space-y-8">
                        <h3 className="text-3xl md:text-4xl font-inter font-bold leading-tight">
                            Contact Us
                        </h3>
                        <div className="space-y-4 text-lg font-medium">
                            <div className="flex flex-col gap-4">
                                <a href="https://www.instagram.com/voho.luxe" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-3">
                                    <Instagram size={20} /> Instagram
                                </a>
                                <a href="https://www.facebook.com/share/1ByvMC9x8b/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-3">
                                    <Facebook size={20} /> Facebook
                                </a>
                                <a href="https://maps.app.goo.gl/YoRQbmTBrbusF5K9A" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors flex items-center gap-3">
                                    <MapPin size={20} /> Visit Us
                                </a>
                                <a href="mailto:voholuxury@gmail.com" className="hover:text-accent transition-colors flex items-center gap-3">
                                    <Mail size={20} /> Email Us: voholuxury@gmail.com
                                </a>
                                <a href="tel:8977665668" className="hover:text-accent transition-colors flex items-center gap-3">
                                    <Phone size={20} /> Call Us: 8977665668
                                </a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 mt-8 opacity-80">
                            {/* Logo Placeholder or Brand */}
                            <div className="w-12 h-12 flex items-center justify-center">
                                <Image
                                    src={imagePath("/images/logo.png")}
                                    alt="VOHO"
                                    width={48}
                                    height={48}
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                            <div className="text-xs uppercase tracking-widest leading-relaxed text-white/60">
                                VOHO Hotels<br /> Luxury Stays
                            </div>
                        </div>
                    </div>

                    {/* Spacer (Span 1) */}
                    <div className="lg:col-span-1 hidden lg:block"></div>

                    {/* Right: Links Grid (Span 6) */}
                    <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-8 text-sm font-inter">

                        {/* Visit Our */}
                        <div className="space-y-6">
                            <p className="font-bold text-white mb-2">Visit our</p>
                            <div className="space-y-4 text-white/60 flex flex-col">
                                <Link href="#" className="hover:text-accent transition-colors">Events</Link>
                                <Link href="#" className="hover:text-accent transition-colors">Experiences</Link>
                                <Link href="#" className="hover:text-accent transition-colors">Dining</Link>
                                <Link href="#" className="hover:text-accent transition-colors">Wellness</Link>
                            </div>
                        </div>

                        {/* Follow Us */}
                        <div className="space-y-6">
                            <p className="font-bold text-white mb-2">Follow us</p>
                            <div className="flex gap-4 mb-4">
                                <a href="https://www.facebook.com/share/1ByvMC9x8b/" target="_blank" rel="noopener noreferrer">
                                    <Facebook className="hover:text-accent transition-colors cursor-pointer" size={20} />
                                </a>
                                <a href="https://www.instagram.com/voho.luxe" target="_blank" rel="noopener noreferrer">
                                    <Instagram className="hover:text-accent transition-colors cursor-pointer" size={20} />
                                </a>
                                <Youtube className="hover:text-accent transition-colors cursor-pointer" size={20} />
                            </div>
                            <p className="text-accent font-bold">#VOHOBhimavaram</p>
                            <button className="px-4 py-2 rounded-full border border-accent/40 text-accent text-xs hover:bg-accent hover:text-black transition-all">
                                Media Library
                            </button>
                        </div>

                        {/* Weather/Location Widget */}
                        <div className="space-y-6 bg-white/5 p-4 rounded-2xl backdrop-blur-sm self-start">
                            <div className="flex items-center gap-2">
                                <span className="text-xl font-bold">28°C</span>
                            </div>
                            <div className="text-xs text-white/60">
                                Bhimavaram, AP<br />
                                Local Time: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                        </div>

                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between text-xs text-white/30 font-inter pb-8 border-t border-white/10 pt-8">
                    <div className="flex items-center gap-2">
                        <span>© 2026 VOHO Hotels. All Rights Reserved.</span>
                        <span className="mx-2">|</span>
                        <span>Made by Surya</span>
                    </div>
                    <div className="flex items-center gap-6 mt-4 md:mt-0">
                        <Link href="#" className="hover:text-white transition-colors">En</Link>
                        <Link href="#" className="hover:text-white transition-colors">Te</Link>
                        <Link href="#" className="hover:text-white transition-colors">Hi</Link>
                    </div>
                </div>

            </div>

            {/* GIANT TEXT BACKGROUND - Positioned absolutely at bottom */}
            <div className="w-full flex justify-center overflow-hidden pointer-events-none opacity-20 select-none -mb-12 md:-mb-24">
                <h1 className="text-[25vw] font-playfair font-bold text-accent leading-none tracking-tighter">
                    VOHO
                </h1>
            </div>
        </footer>
    );
}
