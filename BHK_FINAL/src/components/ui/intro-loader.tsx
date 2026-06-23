"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { imagePath } from "../../lib/utils";

export function IntroLoader({ onComplete }: { onComplete: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Prevent scrolling during intro
        document.body.style.overflow = "hidden";

        const timer = setTimeout(() => {
            setIsVisible(false);
            onComplete();
            document.body.style.overflow = "auto";
        }, 2500); // Total duration

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "auto";
        };
    }, [onComplete]);

    if (!isVisible) return null;

    return (

        <motion.div
            className="fixed inset-0 z-[100] bg-[#0F2822] flex items-center justify-center overflow-hidden"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0, pointerEvents: "none" }}
            transition={{ duration: 0.5, delay: 3.5 }}
        >
            <motion.div
                className="relative flex flex-col items-center justify-center"
                initial={{ scale: 1 }}
                animate={{ scale: 50 }}
                transition={{
                    duration: 1.5,
                    delay: 2.2,
                    ease: "circIn"
                }}
            >
                {/* Logo Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="relative w-32 h-32 md:w-48 md:h-48 mb-4"
                >
                    <Image
                        src={imagePath("/images/logo.png")}
                        alt="VOHO"
                        fill
                        className="object-contain brightness-0 invert"
                        priority
                    />
                </motion.div>

                {/* VOHO Text - Reveals from Logo */}
                <motion.h1
                    initial={{ y: -50, opacity: 0, scale: 0.5 }}
                    animate={{ y: 0, opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: "backOut" }}
                    className="text-6xl md:text-8xl font-playfair font-black text-[#D4AF37] tracking-widest"
                >
                    VOHO
                </motion.h1>
            </motion.div>
        </motion.div>
    );
}
