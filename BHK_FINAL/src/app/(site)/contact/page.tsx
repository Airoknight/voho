"use client";

import { Header } from "../../../components/layout/header";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">
            <Header />

            <div className="pt-32 pb-24 container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <h1 className="text-5xl font-playfair font-bold text-primary mb-6">Get in Touch</h1>
                    <p className="text-muted-foreground font-inter text-lg">We are here to assist you with your booking and any questions you may have.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
                    <div className="text-center p-8 border border-gray-100 rounded-none shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                            <Phone size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-playfair mb-2">Phone</h3>
                        <p className="text-muted-foreground">89776 65668</p>
                    </div>

                    <div className="text-center p-8 border border-gray-100 rounded-none shadow-lg hover:shadow-xl transition-shadow">
                        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                            <Mail size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-playfair mb-2">Email</h3>
                        <p className="text-muted-foreground">voholuxury@gmail.com</p>
                    </div>

                    <a
                        href="https://maps.app.goo.gl/YoRQbmTBrbusF5K9A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-center p-8 border border-gray-100 rounded-none shadow-lg hover:shadow-xl transition-shadow block hover:border-accent"
                    >
                        <div className="w-16 h-16 bg-accent/10 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                            <MapPin size={32} />
                        </div>
                        <h3 className="text-xl font-bold font-playfair mb-2">Location</h3>
                        <p className="text-muted-foreground">Near Someswara Temple,</p>
                        <p className="text-muted-foreground">Bhimavaram, Andhra Pradesh</p>
                    </a>
                </div>

                {/* Form */}
                <div className="max-w-2xl mx-auto bg-gray-50 p-8 md:p-12 rounded-none mb-24">
                    <h3 className="text-2xl font-bold font-playfair mb-8 text-center">Send us a Message</h3>
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Name</label>
                                <input type="text" placeholder="Enter your name" className="w-full bg-white border border-gray-200 rounded-none px-4 py-3 focus:outline-none focus:border-accent" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase text-gray-500">Email</label>
                                <input type="email" placeholder="Enter your email" className="w-full bg-white border border-gray-200 rounded-none px-4 py-3 focus:outline-none focus:border-accent" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase text-gray-500">Message</label>
                            <textarea rows={4} placeholder="How can we help you?" className="w-full bg-white border border-gray-200 rounded-none px-4 py-3 focus:outline-none focus:border-accent"></textarea>
                        </div>
                        <button className="w-full bg-[#0F2822] text-[#D4AF37] font-bold py-4 rounded-none hover:bg-[#D4AF37] hover:text-[#0F2822] transition-colors shadow-lg">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </main>
    );
}
