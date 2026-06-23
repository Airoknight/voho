"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const categories = [
    { id: "art", label: "Art & Culture", icon: "🎨" },
    { id: "culinary", label: "Culinary Scene", icon: "🍷" },
    { id: "nature", label: "Nature & Adventure", icon: "🌲" },
    { id: "leisure", label: "Leisure & More", icon: "🧘" },
];

const items = {
    art: [
        { title: "Museums & Galleries", image: "https://api.armenia.travel/storage/Armenia_Travel_Home_01-min.png" },
        { title: "Pre-Christian Heritage", image: "https://api.armenia.travel/storage/Armenia_Travel_Home_02-min.png" },
        { title: "Armenian Architecture", image: "https://api.armenia.travel/storage/Opera-House-in-Yerevan-with-no-one-around-it-min.webp" },
    ],
    culinary: [
        { title: "Armenian Cuisine", image: "https://api.armenia.travel/storage/WGXC4397-2-min.webp" },
        { title: "Armenian Wine", image: "https://api.armenia.travel/storage/Ararat-wine-region-2-min.webp" },
        { title: "Farm to Table", image: "https://api.armenia.travel/storage/Farmtofork-min.webp" },
    ],
    nature: [
        { title: "Hiking & Trekking", image: "https://api.armenia.travel/storage/Travel_Armenia_Hiking_Trekking_05-min.jpg" },
        { title: "Extreme Sports", image: "https://api.armenia.travel/storage/Mask-Group-1020-min.webp" },
        { title: "Nature & Wildlife", image: "https://api.armenia.travel/storage/Armenia_Travel_Nature_wildlfe_Featured.jpg" },
    ],
    leisure: [
        { title: "Bucket List", image: "https://api.armenia.travel/storage/hnevank-1-min-1.webp" },
        { title: "Nightlife", image: "https://api.armenia.travel/storage/DSC_5821-min.webp" },
        { title: "Health & Wellness", image: "https://api.armenia.travel/storage/HRKH0466-min.webp" },
    ]
};

export function ThingsToDo() {
    const [activeTab, setActiveTab] = useState<keyof typeof items>("art");

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                {/* Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveTab(cat.id as keyof typeof items)}
                            className={cn(
                                "flex items-center gap-2 px-8 py-4 rounded-full text-sm font-bold tracking-wide transition-all uppercase",
                                activeTab === cat.id
                                    ? "bg-cobalt text-white shadow-lg scale-105"
                                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                            )}
                        >
                            <span className="text-xl">{cat.icon}</span>
                            {cat.label}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <AnimatePresence mode="wait">
                        {items[activeTab]?.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                                <div className="absolute bottom-6 left-6 text-white">
                                    <h3 className="text-xl font-playfair font-bold">{item.title}</h3>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

            </div>
        </section>
    );
}
