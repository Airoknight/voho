"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const facts = [
    { title: "Breathtaking Sights", desc: "The Wings Of Tatev is the world's longest reversible aerial tramway.", color: "bg-green-pea" },
    { title: "Historic Center Of Winemaking", desc: "Armenia is home to the oldest discovered winery, dating back 6,100 years.", color: "bg-wine-berry" },
    { title: "Unique Alphabet", desc: "The Armenia language has its very own unique alphabet with 39 letters.", color: "bg-big-stone" },
    { title: "Older Than Rome", desc: "Yerevan is over 2,800 years old, older than Rome.", color: "bg-cobalt" }
];

export function InterestingFacts() {
    return (
        <section className="py-24 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-playfair font-bold text-primary mb-2">Interesting Facts</h2>
                    <p className="text-muted-foreground font-inter">A few awesome facts about The Hidden Track!</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {facts.map((fact, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`${fact.color} text-white p-8 rounded-[2rem] min-h-[300px] flex flex-col justify-between group hover:scale-105 transition-transform duration-300`}
                        >
                            <div>
                                {/* Icon Placeholder */}
                                <div className="w-10 h-10 border border-white/30 rounded-full flex items-center justify-center mb-6">
                                    <span className="text-lg">★</span>
                                </div>
                                <h3 className="text-xl font-playfair font-bold mb-4">{fact.title}</h3>
                                <p className="text-sm font-inter opacity-80 leading-relaxed">{fact.desc}</p>
                            </div>

                            <div className="self-end opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
