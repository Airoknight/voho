"use client";

import { Header } from "../../../../components/layout/header";
import { Button } from "../../../../components/ui/button";
import { MapPin, Wifi, Coffee, Wind, Users, Star } from "lucide-react";
import Image from "next/image";

export default function HostelDetailsClient({ id }: { id: string }) {
    // Mock Data (would normally fetch based on ID)
    const hostel = {
        name: "The Hosteller Goa, Calangute",
        location: "Calangute, Goa",
        description: "Located just a stone's throw away from the famous Calangute beach, this hostel is the perfect blend of chill vibes and party energy. Featuring a swimming pool, open-air cafe, and vibrant common areas.",
        rating: 4.5,
        reviews: 1240,
        price: 899,
        images: [
            "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            "https://images.unsplash.com/photo-1520277739336-7bf67edfa768?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        ],
        amenities: [
            { name: "Free Wifi", icon: Wifi },
            { name: "Air Conditioning", icon: Wind },
            { name: "Cafe", icon: Coffee },
            { name: "Common Area", icon: Users },
        ]
    };

    return (
        <main className="min-h-screen bg-background">
            <Header />

            {/* Hero Gallery */}
            <section className="relative h-[60vh] md:h-[70vh] mt-16 md:mt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                    <div className="relative h-full w-full">
                        <Image src={hostel.images[0]} alt="Main" fill className="object-cover" />
                    </div>
                    <div className="hidden md:grid grid-rows-2 h-full">
                        <div className="relative w-full h-full">
                            <Image src={hostel.images[1]} alt="Side 1" fill className="object-cover" />
                        </div>
                        <div className="relative w-full h-full">
                            <Image src={hostel.images[2]} alt="Side 2" fill className="object-cover" />
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-8 text-white">
                    <div className="container">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
                            <div>
                                <div className="flex items-center gap-2 text-brand-yellow font-bold uppercase tracking-wider mb-2">
                                    <MapPin className="w-4 h-4" /> {hostel.location}
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black font-montserrat">{hostel.name}</h1>
                            </div>
                            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full">
                                <Star className="w-5 h-5 text-brand-yellow fill-brand-yellow" />
                                <span className="font-bold text-xl">{hostel.rating}</span>
                                <span className="text-sm border-l border-white/30 pl-2 ml-2">{hostel.reviews} Reviews</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="container py-12">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left Content */}
                    <div className="flex-1">
                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-montserrat text-primary mb-4">About the Hostel</h2>
                            <p className="font-mulish text-gray-600 leading-relaxed text-lg">
                                {hostel.description}
                            </p>
                        </div>

                        <div className="mb-12">
                            <h2 className="text-2xl font-bold font-montserrat text-primary mb-6">Amenities</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {hostel.amenities.map((item) => (
                                    <div key={item.name} className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100 text-center hover:shadow-md transition-shadow">
                                        <item.icon className="w-8 h-8 text-secondary mb-3" />
                                        <span className="font-bold text-gray-700 text-sm">{item.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sticky Sidebar */}
                    <div className="lg:w-[350px]">
                        <div className="sticky top-24 bg-white rounded-xl shadow-xl border border-gray-100 p-6">
                            <div className="flex justify-between items-end mb-6">
                                <div>
                                    <span className="text-gray-400 text-sm line-through">₹1299</span>
                                    <div className="text-3xl font-black text-secondary">₹{hostel.price}</div>
                                </div>
                                <span className="text-gray-500 font-bold text-sm">/ night</span>
                            </div>

                            <div className="space-y-4 mb-6">
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Check In - Check Out</label>
                                    <div className="font-bold text-primary">Feb 18 - Feb 20</div>
                                </div>
                                <div className="border border-gray-200 rounded-lg p-3">
                                    <label className="text-xs font-bold text-gray-500 uppercase block mb-1">Guests</label>
                                    <div className="font-bold text-primary">1 Guest</div>
                                </div>
                            </div>

                            <Button className="w-full h-12 text-lg font-bold bg-brand-yellow text-primary hover:bg-brand-yellow/90">
                                Reserve Your Spot
                            </Button>
                            <p className="text-center text-xs text-gray-400 mt-4">No credit card required for booking.</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
