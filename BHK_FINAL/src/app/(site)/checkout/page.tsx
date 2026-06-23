"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, Suspense } from "react";
import { Header } from "../../../components/layout/header";
import { motion } from "framer-motion";

function CheckoutContent() {
    const searchParams = useSearchParams();
    const roomId = searchParams.get("room") || "unknown";
    const pricePerNight = parseInt(searchParams.get("price") || "4500");

    // State for form
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [guests, setGuests] = useState("2");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Calculate total logic (simplified)
    const total = pricePerNight * 1; // Default 1 night for now if dates not picked

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
        }, 2000);
    };

    if (isSuccess) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6"
                >
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </motion.div>
                <h2 className="text-3xl font-playfair font-bold mb-2">Payment Successful!</h2>
                <p className="text-muted-foreground mb-8">Your booking for Room {roomId} is confirmed.</p>
                <Link href="/" className="px-8 py-3 bg-primary text-white rounded-full font-bold">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-playfair font-bold mb-8 text-center">Secure Checkout</h1>

            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                {/* Booking Details Form */}
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Your Stay</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => setCheckIn(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                                <input
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                                <select
                                    value={guests}
                                    onChange={(e) => setGuests(e.target.value)}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none"
                                >
                                    <option value="1">1 Guest</option>
                                    <option value="2">2 Guests</option>
                                    <option value="3">3 Guests</option>
                                    <option value="4">4 Guests</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold mb-4">Payment Method</h3>
                        <form onSubmit={handlePayment} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                                <input type="text" placeholder="0000 0000 0000 0000" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none" required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry</label>
                                    <input type="text" placeholder="MM/YY" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                                    <input type="text" placeholder="123" className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-accent outline-none" required />
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-black/90 transition-all flex items-center justify-center mt-6"
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                ) : (
                                    `Pay ₹${total}`
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Order Summary */}
                <div className="bg-muted/30 p-8 rounded-2xl h-fit">
                    <h3 className="text-xl font-bold mb-6">Order Summary</h3>

                    <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-200">
                        <div>
                            <p className="font-bold">Room Selection</p>
                            <p className="text-sm text-muted-foreground capitalize">{roomId.replace('-', ' ')}</p>
                        </div>
                        <p className="font-bold">₹{pricePerNight}</p>
                    </div>


                    <div className="flex justify-between items-center mb-2">
                        <p className="text-muted-foreground">Taxes & Fees (10%)</p>
                        <p>₹{pricePerNight * 0.1}</p>
                    </div>

                    <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-300">
                        <p className="text-xl font-bold">Total</p>
                        <p className="text-xl font-bold">₹{pricePerNight + (pricePerNight * 0.1)}</p>
                    </div>

                    <div className="mt-8 p-4 bg-blue-50 text-blue-800 rounded-lg text-sm">
                        <p className="font-bold mb-1">Safe & Secure</p>
                        <p>Your payment information is encrypted and processed securely.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <main className="min-h-screen bg-background pt-24 pb-12">
            <Header />
            <Suspense fallback={<div className="text-center pt-20">Loading checkout...</div>}>
                <CheckoutContent />
            </Suspense>
        </main>
    );
}
