"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X, ChevronLeft, ChevronRight, Snowflake } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { imagePath } from "../../lib/utils";

const rooms = [
    {
        id: "flat-1",
        title: "Luxury Flat 1",
        type: "Flat",
        guests: "4 Guests",
        image: imagePath("/images/flat1.jpg"),
        price: "₹8,000",
        description: "A spacious luxury flat with modern amenities, perfect for families.",
        features: ["Split AC", "King Size Bed", "Free Wi-Fi", "TV"],
        gallery: [
            imagePath("/images/flat1.jpg"),
            imagePath("/images/flat2.jpg"),
            imagePath("/images/flat3.jpg"),
            imagePath("/images/flat4.jpg"),
            imagePath("/images/flat5.jpg"),
            imagePath("/images/flat6.jpg"),
            imagePath("/images/flat7.jpg")
        ]
    },
    {
        id: "flat-2",
        title: "Luxury Flat 2",
        type: "Flat",
        guests: "4 Guests",
        image: imagePath("/images/flat2-1.jpg"),
        price: "₹8,000",
        description: "Elegant and comfortable, offering a serene escape in the city.",
        features: ["Split AC", "Double Bed", "Free Wi-Fi", "TV"],
        gallery: [
            imagePath("/images/flat2-1.jpg"),
            imagePath("/images/flat2-2.jpg"),
            imagePath("/images/flat2-3.jpg"),
            imagePath("/images/flat2-4.jpg"),
            imagePath("/images/flat2-5.jpg"),
            imagePath("/images/flat2-6.jpg")
        ]
    },
    {
        id: "flat-3",
        title: "Luxury Flat 3",
        type: "Flat",
        guests: "4 Guests",
        image: imagePath("/images/flat3.jpg"),
        price: "₹8,000",
        description: "Sophisticated design meets absolute comfort in our newest flat.",
        features: ["Split AC", "King Bed", "Smart TV", "Garden View"],
        gallery: [
            imagePath("/images/flat3.jpg"),
            imagePath("/images/flat4.jpg")
        ]
    },
    {
        id: "flat-4",
        title: "Luxury Flat 4",
        type: "Flat",
        guests: "4 Guests",
        image: imagePath("/images/flat4.jpg"),
        price: "₹8,000",
        description: "Modern living with premium finishes and a beautiful private balcony.",
        features: ["Split AC", "Work Desk", "Balcony", "Free Wi-Fi"],
        gallery: [
            imagePath("/images/flat4.jpg"),
            imagePath("/images/flat5.jpg")
        ]
    },
    {
        id: "suite",
        title: "Royal Suite",
        type: "Suite",
        guests: "2 Guests",
        image: imagePath("/images/suite1.jpg"),
        price: "₹3,000",
        description: "Experience royalty with our premium suite featuring exclusive services.",
        features: ["Split AC", "Premium Bedding", "Panoramic View"],
        gallery: [
            imagePath("/images/suite1.jpg"),
            imagePath("/images/suite2.jpg")
        ]
    },
    {
        id: "deck",
        title: "Sky Deck Room",
        type: "Special",
        guests: "2 Guests",
        image: imagePath("/images/deck1.jpg"),
        price: "₹7,000",
        description: "Breathtaking views from your private deck. A romantic getaway.",
        features: ["Split AC", "Outdoor Seating", "Stargazing"],
        gallery: [
            imagePath("/images/deck1.jpg"),
            imagePath("/images/deck2.jpg"),
            imagePath("/images/deck3.jpg"),
            imagePath("/images/deck4.jpg")
        ]
    },
    {
        id: "open-area",
        title: "Open Area / Event Space",
        type: "Event",
        guests: "20 Guests",
        image: imagePath("/images/deck2.jpg"),
        price: "₹10,000",
        description: "Spacious open area perfect for parties, events, and family gatherings.",
        features: ["Open Sky", "Music System", "Party Space", "Waiters"],
        gallery: [
            imagePath("/images/deck2.jpg"),
            imagePath("/images/deck3.jpg")
        ]
    }
];

function RoomModal({ room, onClose }: { room: any, onClose: () => void }) {
    const [currentImage, setCurrentImage] = useState(0);

    const nextImage = (e: any) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % room.gallery.length);
    };

    const prevImage = (e: any) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + room.gallery.length) % room.gallery.length);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Image Gallery Side */}
                <div className="md:w-3/5 relative h-64 md:h-auto bg-gray-200">
                    <Image
                        src={room.gallery[currentImage]}
                        alt={room.title}
                        fill
                        className="object-cover"
                    />

                    {/* Gallery Controls */}
                    <button onClick={prevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors">
                        <ChevronLeft />
                    </button>
                    <button onClick={nextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition-colors">
                        <ChevronRight />
                    </button>

                    {/* Indicator dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                        {room.gallery.map((_: any, i: number) => (
                            <div key={i} className={`w-2 h-2 rounded-full ${i === currentImage ? 'bg-white' : 'bg-white/50'}`} />
                        ))}
                    </div>
                </div>

                {/* Content Side */}
                <div className="md:w-2/5 p-8 flex flex-col overflow-y-auto">
                    <button onClick={onClose} className="self-end mb-4 text-gray-500 hover:text-black">
                        <X size={24} />
                    </button>

                    <div className="mb-2">
                        <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">{room.type}</span>
                    </div>

                    <h2 className="text-3xl font-playfair font-bold mb-2">{room.title}</h2>
                    <p className="text-muted-foreground font-inter mb-6">{room.description}</p>

                    <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                <span className="text-sm">👥</span>
                            </div>
                            <span className="font-medium">{room.guests}</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
                                <Snowflake size={14} className="text-blue-500" />
                            </div>
                            <span className="font-medium">Climate Control – Split AC</span>
                        </div>
                        {room.features && (
                            <div className="flex flex-wrap gap-2 mt-2">
                                {room.features.filter((f: string) => f !== "Split AC").map((f: string, i: number) => (
                                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 text-gray-600">{f}</span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-end mb-4">
                            <div>
                                <p className="text-sm text-muted-foreground">Price per night</p>
                                <p className="text-2xl font-bold text-primary">{room.price}</p>
                            </div>
                        </div>
                        <Link
                            href={`/checkout?room=${room.id}&price=${room.price.replace('₹', '').replace(',', '')}`}
                            className="block w-full text-center py-4 bg-primary text-white font-bold rounded-xl hover:bg-accent transition-colors"
                        >
                            Book Now
                        </Link>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Accommodation() {
    const [selectedRoom, setSelectedRoom] = useState<any>(null);

    return (
        <section className="py-24 bg-[#0F2822]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl font-playfair font-bold text-white mb-2">Our Stays</h2>
                        <p className="text-gray-400 font-inter">Experience comfort in our curated spaces.</p>
                    </div>

                    <div className="hidden md:flex items-center gap-6">
                        <Link href="/booking" className="px-6 py-3 bg-[#D4AF37] text-[#0F2822] font-bold rounded-full hover:bg-white hover:text-[#0F2822] transition-colors shadow-lg">
                            Book Now
                        </Link>
                        <Link href="/booking" className="flex items-center gap-2 text-[#D4AF37] font-bold hover:gap-4 transition-all">
                            View All Options <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {rooms.map((room) => (
                        <div
                            key={room.id}
                            onClick={() => setSelectedRoom(room)}
                            className="group bg-white overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col cursor-pointer"
                        >
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={room.image}
                                    alt={room.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary">
                                    {room.type}
                                </div>
                                <div className="absolute bottom-4 left-4 flex items-center gap-1.5 bg-blue-500/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                                    <Snowflake size={12} /> Split AC
                                </div>
                            </div>

                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-xl font-playfair font-bold">{room.title}</h3>
                                </div>

                                <p className="text-sm text-muted-foreground font-inter mb-4">{room.guests}</p>

                                <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
                                    <div>
                                        <span className="block text-lg font-bold text-primary">{room.price}</span>
                                        <span className="text-xs text-muted-foreground">/ night</span>
                                    </div>
                                    <button className="bg-primary text-white p-3 rounded-full hover:bg-accent transition-colors">
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <div className="flex flex-col items-center gap-4">
                        <Link href="/booking" className="w-full max-w-xs py-4 bg-[#D4AF37] text-[#0F2822] font-bold rounded-xl shadow-lg hover:bg-white transition-colors">
                            Book Now
                        </Link>
                        <Link href="/booking" className="inline-flex items-center gap-2 text-[#D4AF37] font-bold">
                            View All Options <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>

            </div>

            <AnimatePresence>
                {selectedRoom && (
                    <RoomModal room={selectedRoom} onClose={() => setSelectedRoom(null)} />
                )}
            </AnimatePresence>
        </section>
    );
}
