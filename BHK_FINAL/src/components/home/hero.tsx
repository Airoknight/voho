"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Download, FastForward, Rewind } from "lucide-react";
import { imagePath } from "../../lib/utils";

export function Hero() {
    const containerRef = useRef<HTMLElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    // Standard scroll tracking
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // SIMPLIFIED TRANSFORMATIONS
    // Video gets "compressed" (scales down slightly)
    const videoScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.9]);
    const videoRadius = useTransform(scrollYProgress, [0, 0.8], ["0px", "40px"]);
    const videoOpacity = useTransform(scrollYProgress, [0.5, 0.9], [1, 0]); // Fades out at the end

    // Text fades out quickly
    const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

    // Video Controls
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleTimeUpdate = () => {
            const p = (video.currentTime / video.duration) * 100;
            setProgress(p);
        };
        video.addEventListener("timeupdate", handleTimeUpdate);
        return () => video.removeEventListener("timeupdate", handleTimeUpdate);
    }, []);

    const forward10 = () => {
        if (videoRef.current) videoRef.current.currentTime += 10;
    };

    const rewind10 = () => {
        if (videoRef.current) videoRef.current.currentTime -= 10;
    };

    const seekVideo = (e: React.MouseEvent<HTMLDivElement>) => {
        const video = videoRef.current;
        const bar = progressBarRef.current;
        if (!video || !bar) return;
        const rect = bar.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const fraction = clickX / rect.width;
        video.currentTime = fraction * video.duration;
    };

    const downloadVideo = async () => {
        try {
            const response = await fetch(imagePath("/videos/herovideo.mp4"));
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = "VOHO_Promo.mp4";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch {
            // Fallback: open in new tab if fetch fails
            window.open(imagePath("/videos/herovideo.mp4"), "_blank");
        }
    };

    return (
        <section ref={containerRef} className="relative h-[120vh] w-full bg-[#0F2822]">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">

                {/* 1. Background Video Layer - Compresses */}
                <motion.div
                    style={{
                        scale: videoScale,
                        borderRadius: videoRadius,
                        opacity: videoOpacity
                    }}
                    className="absolute inset-0 z-0 overflow-hidden bg-neutral-900 origin-center"
                >
                    <video
                        ref={videoRef}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    >
                        <source
                            src={imagePath("/videos/herovideo.mp4")}
                            type="video/mp4"
                        />
                    </video>
                    <div className="absolute inset-0 bg-black/30" />
                </motion.div>

                {/* 2. Text & Controls Layer (Fades out) */}
                <motion.div style={{ opacity: textOpacity }} className="absolute inset-0 z-10 flex flex-col justify-between p-12 pointer-events-none">
                    <div className="flex-1 flex flex-col items-center justify-center text-center text-white">
                        <div className="relative w-64 h-32 md:w-96 md:h-48 mb-6">
                            <Image
                                src={imagePath("/images/logo.png")}
                                alt="VOHO"
                                fill
                                className="object-contain brightness-0 invert"
                                priority
                            />
                        </div>
                        <p className="font-inter text-2xl uppercase tracking-[0.5em] mt-4">Bhimavaram</p>
                    </div>

                    <div className="w-full text-white pointer-events-auto">
                        <div
                            ref={progressBarRef}
                            onClick={seekVideo}
                            className="w-full h-2 bg-white/30 rounded-full overflow-hidden mb-6 cursor-pointer hover:h-3 transition-all group"
                        >
                            <div className="h-full bg-accent transition-all" style={{ width: `${progress}%` }} />
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-4">
                                <button onClick={rewind10} className="hover:text-accent transition-colors" title="Rewind 10s"><Rewind /></button>
                                <button onClick={forward10} className="hover:text-accent transition-colors" title="Forward 10s"><FastForward /></button>
                            </div>
                            <button onClick={downloadVideo} className="flex gap-2 items-center bg-white/10 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 hover:bg-white hover:text-black transition-all">
                                <Download size={16} /> <span className="text-sm font-medium uppercase tracking-wider">Download</span>
                            </button>
                        </div>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
