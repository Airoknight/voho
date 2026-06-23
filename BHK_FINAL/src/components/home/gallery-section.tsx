"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import { imagePath } from "../../lib/utils";

const CircularGallery = dynamic(() => import("../ui/circular-gallery"), { ssr: false });

export function GallerySection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { amount: 0.3, once: false });

    const galleryItems = [
        { image: imagePath("/images/deck1.jpg"), text: "Sky Deck" },
        { image: imagePath("/images/flat1.jpg"), text: "Luxury Flat" },
        { image: imagePath("/images/suite1.jpg"), text: "Royal Suite" },
        { image: imagePath("/images/deck3.jpg"), text: "Lounge Area" },
        { image: imagePath("/images/flat2-2.jpg"), text: "Master Room" },
    ];

    return (
        <section ref={containerRef} className="relative w-full h-screen bg-[#0F2822] overflow-hidden flex flex-col items-center justify-center py-20">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                backgroundImage: "url('https://www.transparenttextures.com/patterns/shattered-island.png')",
                backgroundSize: "cover"
            }}></div>

            <div className="relative z-10 w-full h-full">
                <CircularGallery
                    items={galleryItems}
                    bend={1}
                    textColor="#ffffff"
                    borderRadius={0.05}
                    scrollEase={0.05}
                    scrollSpeed={2}
                    enableWheel={true}
                    active={isInView}
                />
            </div>

            <div className="absolute bottom-10 left-0 w-full flex justify-center z-20 pointer-events-auto">
                <Link href="/gallery" className="px-8 py-3 bg-white/10 backdrop-blur-md text-white font-playfair font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 rounded-full border border-white/20">
                    View Full Gallery
                </Link>
            </div>
        </section>
    );
}
