"use client";

import { Wifi, Tv, Coffee, Car, Lock, Wind } from "lucide-react";

const services = [
    { icon: Wifi, title: "High-Speed Wifi", desc: "Stay connected seamlessly throughout your stay." },
    { icon: Tv, title: "Smart Entertainment", desc: "Latest streaming apps on large flat-screen TVs." },
    { icon: Car, title: "Free Parking", desc: "Secure parking space for your vehicles." },
    { icon: Lock, title: "24/7 Security", desc: "Round-the-clock security surveillance." }
];

export function Services() {
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-playfair font-bold text-primary mb-4">Our Services</h2>
                    <p className="text-muted-foreground font-inter">Everything you need for a perfect stay.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
                    {services.map((s, index) => (
                        <div key={index} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 rounded-2xl bg-muted/30 group-hover:bg-accent/10 flex items-center justify-center mb-4 transition-colors">
                                <s.icon size={32} className="text-primary group-hover:text-accent transition-colors" />
                            </div>
                            <h3 className="font-bold font-inter text-sm mb-1">{s.title}</h3>
                            {/* <p className="text-xs text-muted-foreground hidden lg:block">{s.desc}</p> */}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
