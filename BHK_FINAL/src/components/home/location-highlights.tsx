"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin } from "lucide-react";
import Link from "next/link";
import CircularText from "../ui/circular-text";

// Bhimavaram Locations
const points = [
    {
        id: 1,
        title: "Someswara Temple",
        desc: "Pancharama Kshetras",
        x: "15%",
        y: "20%",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Someswara_Swamy_Temple_entrance_gopuram%2C_Bhimavaram.jpg/640px-Someswara_Swamy_Temple_entrance_gopuram%2C_Bhimavaram.jpg"
    },
    {
        id: 2,
        title: "VOHO Hotel",
        desc: "Your Luxury Stay",
        x: "50%",
        y: "50%",
        active: true,
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800"
    },
    {
        id: 3,
        title: "Mavullamma Temple",
        desc: "Gramadevata",
        x: "85%",
        y: "30%",
        image: "https://lh3.googleusercontent.com/p/AF1QipN-example-placeholder"
    },
    {
        id: 4,
        title: "B.V. Raju Park",
        desc: "Best Places In Bhimavaram",
        x: "30%",
        y: "80%",
        image: "https://images.unsplash.com/photo-1596236987179-8d69f061a9bc?auto=format&fit=crop&q=80&w=400"
    },
];

export function LocationHighlights() {
    const containerRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start center", "end center"]
    });

    // Calculate drawing length based on scroll
    const pathLength = useTransform(scrollYProgress, [0, 0.8], [0, 1]);

    return (
        <section ref={containerRef} className="pt-0 pb-24 bg-[#0F2822] relative overflow-hidden min-h-screen">
            <motion.div
                className="container mx-auto px-4 h-full pt-24"
            >

                <div className="text-center mb-12 relative z-10">
                    <h2 className="text-4xl font-playfair font-bold text-white mb-4">Prime Location</h2>
                    <p className="text-white/60 font-inter">Connected to the heart of Bhimavaram</p>
                </div>

                {/* Circular Text Background */}
                <div className="absolute top-20 right-20 opacity-10 md:opacity-20 pointer-events-none">
                    <CircularText text="BEST PLACES IN BHIMAVARAM * VOHO * " spinDuration={20} className="w-[300px] h-[300px] text-white" />
                </div>

                {/* Map Section */}
                <div className="relative w-full max-w-6xl mx-auto h-[800px] rounded-[3rem] bg-[#0a1c18] border border-[#1D5D4B]/30 shadow-2xl overflow-hidden">

                    {/* Map Background Pattern */}
                    <div className="absolute inset-0 opacity-20" style={{
                        backgroundImage: "url('https://www.transparenttextures.com/patterns/shattered-island.png')",
                        backgroundSize: "cover"
                    }}></div>

                    {/* SVG Curve - Downward Arc */}
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 1000 800" preserveAspectRatio="none">
                        <motion.path
                            d="M150,160 Q325,280 500,400 T850,240 Q600,600 300,640"
                            fill="none"
                            stroke="#D4AF37" // Accent color
                            strokeWidth="4"
                            strokeDasharray="10 10"
                            style={{ pathLength }}
                        />
                    </svg>

                    {/* Points */}
                    <div className="absolute inset-0 w-full h-full">
                        {points.map((point) => (
                            <motion.div
                                key={point.id}
                                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-20"
                                style={{ left: point.x, top: point.y }}
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.2, type: "spring" }}
                                whileHover={{ scale: 1.1, zIndex: 50 }}
                            >
                                {/* Icon Circle */}
                                <div className={`rounded-full flex items-center justify-center relative shadow-xl transition-all duration-300 ${point.active ? "w-24 h-24 border-4 border-accent bg-primary text-white scale-110 z-50 shadow-accent/50" : "w-16 h-16 bg-white text-gray-500 border-2 border-gray-200 hover:border-accent hover:text-accent"}`}>
                                    {point.active ? (
                                        <div className="flex flex-col items-center justify-center">
                                            <span className="font-playfair font-black text-xl leading-none">VOHO</span>
                                            <span className="text-[0.6rem] uppercase tracking-wider mt-0.5">Stay</span>
                                        </div>
                                    ) : (
                                        <MapPin size={28} />
                                    )}
                                </div>

                                {/* Tooltip */}
                                <div className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white p-4 rounded-xl shadow-2xl w-48 text-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none ${point.active ? "opacity-100 mt-6" : ""}`}>
                                    <h4 className="font-bold font-playfair text-primary text-sm">{point.title}</h4>
                                    <p className="text-[10px] text-muted-foreground">{point.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Decorative Noise */}
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay"></div>
                </div>

                {/* Navigation Button */}
                <div className="flex justify-center mt-12 relative z-10">
                    <Link
                        href="https://www.google.com/maps/search/?api=1&query=VOHO+Hotel+Bhimavaram"
                        target="_blank"
                        className="group flex items-center justify-center px-8 py-4 bg-[#D4AF37] border-[6px] border-white/10 text-[#0F2822] gap-3 rounded-full cursor-pointer transition-all duration-300 hover:bg-white hover:border-[#D4AF37] hover:scale-105 active:border-white/30"
                    >
                        <span className="text-lg font-bold tracking-widest uppercase font-playfair">Get Directions</span>
                        <span className="pt-1 h-full w-fit group-hover:animate-jello origin-left">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="50"
                                height="20"
                                viewBox="0 0 38 15"
                                fill="none"
                                className="w-[50px] h-[30px]"
                            >
                                <path
                                    fill="currentColor"
                                    d="M10 7.519l-.939-.344h0l.939.344zm14.386-1.205l-.981-.192.981.192zm1.276 5.509l.537.843.148-.094.107-.139-.792-.611zm4.819-4.304l-.385-.923h0l.385.923zm7.227.707a1 1 0 0 0 0-1.414L31.343.448a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414l5.657 5.657-5.657 5.657a1 1 0 0 0 1.414 1.414l6.364-6.364zM1 7.519l.554.833.029-.019.094-.061.361-.23 1.277-.77c1.054-.609 2.397-1.32 3.629-1.787.617-.234 1.17-.392 1.623-.455.477-.066.707-.008.788.034.025.013.031.021.039.034a.56.56 0 0 1 .058.235c.029.327-.047.906-.39 1.842l1.878.689c.383-1.044.571-1.949.505-2.705-.072-.815-.45-1.493-1.16-1.865-.627-.329-1.358-.332-1.993-.244-.659.092-1.367.305-2.056.566-1.381.523-2.833 1.297-3.921 1.925l-1.341.808-.385.245-.104.068-.028.018c-.011.007-.011.007.543.84zm8.061-.344c-.198.54-.328 1.038-.36 1.484-.032.441.024.94.325 1.364.319.45.786.64 1.21.697.403.054.824-.001 1.21-.09.775-.179 1.694-.566 2.633-1.014l3.023-1.554c2.115-1.122 4.107-2.168 5.476-2.524.329-.086.573-.117.742-.115s.195.038.161.014c-.15-.105.085-.139-.076.685l1.963.384c.192-.98.152-2.083-.74-2.707-.405-.283-.868-.37-1.28-.376s-.849.069-1.274.179c-1.65.43-3.888 1.621-5.909 2.693l-2.948 1.517c-.92.439-1.673.743-2.221.87-.276.064-.429.065-.492.057-.043-.006.066.003.155.127.07.099.024.131.038-.063.014-.187.078-.49.243-.94l-1.878-.689zm14.343-1.053c-.361 1.844-.474 3.185-.413 4.161.059.95.294 1.72.811 2.215.567.544 1.242.546 1.664.459a2.34 2.34 0 0 0 .502-.167l.15-.076.049-.028.018-.011c.013-.008.013-.008-.524-.852l-.536-.844.019-.012c-.038.018-.064.027-.084.032-.037.008.053-.013.125.056.021.02-.151-.135-.198-.895-.046-.734.034-1.887.38-3.652l-1.963-.384zm2.257 5.701l.791.611.024-.031.08-.101.311-.377 1.093-1.213c.922-.954 2.005-1.894 2.904-2.27l-.771-1.846c-1.31.547-2.637 1.758-3.572 2.725l-1.184 1.314-.341.414-.093.117-.025.032c-.01.013-.01.013.781.624zm5.204-3.381c.989-.413 1.791-.42 2.697-.307.871.108 2.083.385 3.437.385v-2c-1.197 0-2.041-.226-3.19-.369-1.114-.139-2.297-.146-3.715.447l.771 1.846z"
                                ></path>
                            </svg>
                        </span>
                    </Link>
                </div>

            </motion.div>
        </section>
    );
}
