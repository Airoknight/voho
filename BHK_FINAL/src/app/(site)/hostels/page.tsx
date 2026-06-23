"use client";

import { Header } from "../../../components/layout/header";
import { Footer } from "../../../components/layout/footer";
import { Button } from "../../../components/ui/button";
import { MapPin, Filter } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Mock data - extended
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
    {
        id: 5,
        name: "The Hosteller Jaipur, MI Road",
        location: "Jaipur",
        image: "https://images.unsplash.com/photo-1590059390047-684a361c463f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "From ₹499",
        rating: 4.4,
    },
    {
        id: 6,
        name: "The Hosteller Kasol",
        location: "Kasol",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        price: "From ₹799",
        rating: 4.9,
    },
];

export default function HostelsPage() {
    return (
        <main className="min-h-screen bg-background">
            <Header />

            {/* Page Header */}
            <section className="bg-primary text-white pt-32 pb-12">
                <div className="container">
                    <h1 className="text-4xl md:text-5xl font-black font-montserrat uppercase tracking-tighter mb-4">
                        All <span className="text-brand-yellow">Locations</span>
                    </h1>
                    <p className="font-mulish text-gray-300 max-w-2xl text-lg">
                        Explore 55+ hostels across India. From the mountains to the beaches, find your vibe.
                    </p>
                </div>
            </section>

            {/* Filters & Grid */}
            <section className="py-12">
                <div className="container">
                    {/* Filter Bar */}
                    <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <div className="flex items-center gap-2 font-bold text-gray-600">
                            <Filter className="w-5 h-5" />
                            <span>Filters:</span>
                            <select className="bg-gray-50 border-none rounded-md px-3 py-1 text-sm focus:ring-0 cursor-pointer">
                                <option>Location</option>
                                <option>Goa</option>
                                <option>Manali</option>
                            </select>
                            <select className="bg-gray-50 border-none rounded-md px-3 py-1 text-sm focus:ring-0 cursor-pointer">
                                <option>Price</option>
                                <option>Low to High</option>
                                <option>High to Low</option>
                            </select>
                        </div>
                        <div className="text-sm font-bold text-gray-500">
                            Showing {hostels.length} Hostels
                        </div>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {hostels.map((hostel) => (
                            <Link
                                href={`/hostels/${hostel.id}`}
                                key={hostel.id}
                                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
                            >
                                <div className="relative aspect-[4/3] overflow-hidden">
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
                                <div className="p-5 flex flex-col flex-1">
                                    <div className="flex items-center gap-1 text-gray-500 text-xs font-bold uppercase tracking-wide mb-2">
                                        <MapPin className="w-3 h-3" /> {hostel.location}
                                    </div>
                                    <h3 className="text-xl font-bold font-montserrat text-primary mb-4 leading-tight group-hover:text-brand-blue transition-colors">
                                        {hostel.name}
                                    </h3>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between">
                                        <div>
                                            <span className="text-gray-400 text-xs line-through block">₹1299</span>
                                            <span className="text-lg font-black text-secondary">{hostel.price}</span>
                                        </div>
                                        <Button size="sm" className="bg-brand-yellow text-primary hover:bg-brand-yellow/80 font-bold">
                                            View Details
                                        </Button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
