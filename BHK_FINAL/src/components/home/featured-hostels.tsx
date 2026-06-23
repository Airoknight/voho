"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight, MapPin } from "lucide-react";

const hostels = [
    {
        id: 1,
        name: "The Hosteller Goa, Calangute",
        location: "Goa",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "From ₹899",
        rating: 4.5,
    },
    {
        id: 2,
        name: "The Hosteller Manali, Old Manali",
        location: "Manali",
        image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "From ₹699",
        rating: 4.8,
    },
    {
        id: 3,
        name: "The Hosteller Rishikesh, Tapovan",
        location: "Rishikesh",
        image: "https://images.unsplash.com/photo-1589802061882-7ea919c0114c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "From ₹599",
        rating: 4.7,
    },
    {
        id: 4,
        name: "The Hosteller Bangalore, Koramangala",
        location: "Bangalore",
        image: "https://images.unsplash.com/photo-1555547432-845617a94205?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "From ₹999",
        rating: 4.6,
    },
];

export function FeaturedHostels() {
    return (
        <section className="py-20 md:py-28 bg-gray-50">
            <div className="container">
                <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
                    <div>
                        <span className="text-secondary font-bold uppercase tracking-wider text-sm">Destinations</span>
                        <h2 className="text-3xl md:text-5xl font-black font-montserrat text-primary mt-2">
                            Explore Our <span className="text-accent">Top Hostels</span>
                        </h2>
                    </div>
                    <Button variant="outline" className="hidden md:flex gap-2">
                        View All Hostels <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {hostels.map((hostel) => (
                        <Link
                            href={`/hostels/${hostel.id}`}
                            key={hostel.id}
                            className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 block"
                        >
                            <div className="relative aspect-[4/5] overflow-hidden">
                                <Image
                                    src={hostel.image}
                                    alt={hostel.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-primary flex items-center gap-1 shadow-sm">
                                    ★ {hostel.rating}
                                </div>
                            </div>
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div className="flex items-center gap-1 text-gray-500 text-xs font-bold uppercase tracking-wide">
                                        <MapPin className="w-3 h-3" /> {hostel.location}
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold font-montserrat text-primary mb-3 line-clamp-2 leading-tight group-hover:text-brand-blue transition-colors">
                                    {hostel.name}
                                </h3>
                                <div className="flex items-center justify-between mt-auto">
                                    <div className="text-gray-400 text-xs line-through">₹1299</div>
                                    <div className="text-lg font-black text-secondary">{hostel.price}</div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="mt-8 text-center md:hidden">
                    <Button variant="outline" className="w-full gap-2">
                        View All Hostels <ArrowRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </section>
    );
}
