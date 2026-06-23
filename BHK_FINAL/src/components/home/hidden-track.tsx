"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function HiddenTrack() {
    return (
        <section className="py-24 bg-white overflow-hidden relative">
            <div className="container mx-auto px-4 flex flex-col items-center text-center">

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-12"
                >
                    <h2 className="text-4xl md:text-6xl font-playfair font-bold text-primary mb-4">
                        The Hidden Track
                    </h2>
                    <p className="text-lg text-muted-foreground font-inter max-w-2xl mx-auto">
                        Discover the untouched beauty, ancient history, and vibrant culture of Armenia.
                        Follow the path less traveled.
                    </p>
                </motion.div>

                {/* Decorative Path / SVG Animation Placeholder */}
                <div className="w-full max-w-4xl h-64 relative mb-12 flex items-center justify-center">
                    {/* Simple animated path representation */}
                    <svg viewBox="0 0 800 200" className="w-full h-full text-accent/20">
                        <motion.path
                            d="M0,100 Q200,0 400,100 T800,100"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="4"
                            initial={{ pathLength: 0 }}
                            whileInView={{ pathLength: 1 }}
                            transition={{ duration: 2, ease: "easeInOut" }}
                        />
                    </svg>
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-full shadow-xl"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 1.5, type: "spring" }}
                    >
                        <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                            <ArrowRight className="text-white w-8 h-8" />
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
                    {[
                        { title: "Natural Splendor", desc: "Breathtaking landscapes awaiting your footsteps." },
                        { title: "Ancient History", desc: "Stories etched in stone from millennia past." },
                        { title: "Modern Adventure", desc: "Thrilling experiences for the bold spirit." }
                    ].map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="p-6 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                            <h3 className="text-xl font-playfair font-bold mb-2 text-primary">{item.title}</h3>
                            <p className="text-sm font-inter text-muted-foreground">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
}
