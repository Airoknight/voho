"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef } from "react";
import type { Swiper as SwiperType } from "swiper";

const destinations = [
    {
        id: 1,
        title: "Yerevan",
        image: "https://api.armenia.travel/storage/Museums_Cafesjian-Center-for-Arts_S-min.webp",
        slug: "yerevan"
    },
    {
        id: 2,
        title: "Instagrammable Spots",
        image: "https://api.armenia.travel/storage/Top_InstagrammableSpots_Stones_S-min.webp",
        slug: "spots"
    },
    {
        id: 3,
        title: "Churches & Monasteries",
        image: "https://api.armenia.travel/storage/Top_Churches_Noravank_S-min-1.webp",
        slug: "churches"
    },
    {
        id: 4,
        title: "Natural Sites",
        image: "https://api.armenia.travel/storage/Natural_Sites_Lake-Parz_S-min-1.webp",
        slug: "nature"
    },
    {
        id: 5,
        title: "Top Cities",
        image: "https://api.armenia.travel/storage/Top_Cities_Gyumri_S.webp",
        slug: "cities"
    },
    {
        id: 6,
        title: "UNESCO Sites",
        image: "https://api.armenia.travel/storage/UNESCO_Zvartnots-Cathedral_S-1.webp",
        slug: "unesco"
    },
    {
        id: 7,
        title: "Top Fortresses",
        image: "https://api.armenia.travel/storage/Top_Fortresses_Amberd_S.webp",
        slug: "fortresses"
    }
];

export function TopDestinations() {
    const swiperRef = useRef<SwiperType>(null);

    return (
        <section className="py-24 bg-[#0F2822]">
            <div className="container mx-auto px-4">

                <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-2">Top Destinations</h2>
                        <p className="text-lg font-inter text-gray-400">Don't miss these must-see hotspots!</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 bg-white"
                            aria-label="Previous slide"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center hover:bg-primary hover:text-white transition-all active:scale-95 bg-white"
                            aria-label="Next slide"
                        >
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                <Swiper
                    modules={[Navigation, Autoplay]}
                    spaceBetween={24}
                    slidesPerView={1.2}
                    loop={true}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    onBeforeInit={(swiper) => {
                        // @ts-ignore
                        swiperRef.current = swiper;
                    }}
                    breakpoints={{
                        640: { slidesPerView: 2.2 },
                        1024: { slidesPerView: 3.2 },
                        1280: { slidesPerView: 4.2 },
                    }}
                    className="w-full !pb-12"
                >
                    {destinations.map((item) => (
                        <SwiperSlide key={item.id} className="group cursor-pointer h-full">
                            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-4">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                            </div>
                            <h3 className="text-xl font-playfair font-bold text-white group-hover:text-accent transition-colors">
                                {item.title}
                            </h3>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
}
