"use client";

import { Header } from "../../../components/layout/header";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, Users, Star, ArrowLeft, Snowflake, Phone, Clock, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { imagePath } from "../../../lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const rooms = [
    {
        id: "flat-1",
        title: "Flat 1",
        guests: 4,
        price: 8000,
        image: imagePath("/images/flat1.jpg"),
        features: ["Split AC", "King Size Bed", "Kitchenette", "Balcony", "City View"]
    },
    {
        id: "flat-2",
        title: "Flat 2",
        guests: 4,
        price: 8000,
        image: imagePath("/images/flat2-1.jpg"),
        features: ["Split AC", "Living Area", "Work Desk", "Garden View"]
    },
    {
        id: "flat-3",
        title: "Flat 3",
        guests: 4,
        price: 8000,
        image: imagePath("/images/flat3.jpg"),
        features: ["Split AC", "King Size Bed", "Kitchenette", "Garden View"]
    },
    {
        id: "flat-4",
        title: "Flat 4",
        guests: 4,
        price: 8000,
        image: imagePath("/images/flat4.jpg"),
        features: ["Split AC", "Living Area", "Work Desk", "Balcony"]
    },
    {
        id: "suite",
        title: "Suite Room",
        guests: 2,
        price: 3000,
        image: imagePath("/images/suite1.jpg"),
        features: ["Split AC", "Jacuzzi", "Panoramic View", "Premium Bedding"]
    },
    {
        id: "deck",
        title: "Deck Room",
        guests: 2,
        price: 7000,
        image: imagePath("/images/deck1.jpg"),
        features: ["Split AC", "Outdoor Seating", "Stargazing"]
    },
    {
        id: "open-area",
        title: "Open Area",
        guests: 20,
        price: 10000,
        image: imagePath("/images/deck2.jpg"),
        features: ["Open Sky", "Event Space", "Party Area", "Panoramic View"]
    }
];

function BookingContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialRoomId = searchParams.get("room");

    const [selectedRooms, setSelectedRooms] = useState(() => {
        if (initialRoomId) {
            const matched = rooms.find(r => r.id === initialRoomId);
            if (matched) return [matched];
        }
        return [rooms[0]];
    });
    const [acFilter, setAcFilter] = useState(false);

    // Form state variables
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");

    const handleConfirmBooking = () => {
        if (!checkIn || !checkOut || !fullName || !phone) {
            alert("Please fill in all the reservation details (Check-in, Check-out, Full Name, and Phone Number).");
            return;
        }
        if (selectedRooms.length === 0) {
            alert("Please select at least one room.");
            return;
        }
        const bookingData = {
            checkIn,
            checkOut,
            fullName,
            email: email || "N/A",
            phone,
            rooms: selectedRooms.map(r => ({ id: r.id, title: r.title, price: r.price })),
            total: subtotal
        };
        localStorage.setItem("temp_booking", JSON.stringify(bookingData));
        router.push("/payment");
    };

    const handleMobileBookNow = () => {
        if (!checkIn || !checkOut || !fullName || !phone) {
            const formElement = document.getElementById("reservation-form");
            if (formElement) {
                formElement.scrollIntoView({ behavior: "smooth" });
            }
            alert("Please fill in your reservation details in the summary form first.");
            return;
        }
        handleConfirmBooking();
    };

    const toggleRoom = (room: any) => {
        if (selectedRooms.find(r => r.id === room.id)) {
            // Already selected, remove if more than 1 selected or allow removing all?
            // Let's allow removing all but the summary will handle empty state.
            setSelectedRooms(selectedRooms.filter(r => r.id !== room.id));
        } else {
            setSelectedRooms([...selectedRooms, room]);
        }
    };

    const subtotal = selectedRooms.reduce((sum, room) => sum + room.price, 0);

    const filteredRooms = acFilter
        ? rooms.filter((r) => r.features.includes("Split AC"))
        : rooms;

    return (
        <main className="min-h-screen bg-background relative selection:bg-accent selection:text-white pb-32 lg:pb-0">
            <Header />

            <div className="pt-32 pb-24 container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
                        <ArrowLeft size={16} /> Back to Home
                    </Link>
                </div>

                <div className="text-center mb-16">
                    <h1 className="text-5xl font-playfair font-bold text-primary mb-4">Book Your Stay</h1>
                    <p className="text-muted-foreground font-inter">Secure your luxury experience at VOHO Bhimavaram.</p>
                </div>

                {/* Booking Time Rules */}
                <div className="mb-10 bg-[#0F2822] text-white p-6 flex flex-col md:flex-row items-center justify-center gap-8">
                    <div className="flex items-center gap-3">
                        <Clock size={20} className="text-[#D4AF37]" />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Check-in Time</p>
                            <p className="text-lg font-bold text-[#D4AF37]">1:00 PM</p>
                        </div>
                    </div>
                    <div className="w-px h-10 bg-white/20 hidden md:block" />
                    <div className="flex items-center gap-3">
                        <Clock size={20} className="text-[#D4AF37]" />
                        <div>
                            <p className="text-xs uppercase tracking-widest text-gray-400">Check-out Time</p>
                            <p className="text-lg font-bold text-[#D4AF37]">11:00 AM</p>
                        </div>
                    </div>
                </div>

                {/* AC Filter */}
                <div className="mb-6 flex items-center gap-3">
                    <button
                        onClick={() => setAcFilter(!acFilter)}
                        className={`flex items-center gap-2 px-4 py-2 text-sm font-bold border transition-all ${acFilter ? "bg-blue-500 text-white border-blue-500" : "bg-white text-gray-600 border-gray-200 hover:border-blue-300"}`}
                    >
                        <Snowflake size={16} /> Climate Control (AC)
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Room Selection */}
                    <div className="lg:col-span-8 space-y-8">
                        {filteredRooms.map((room) => {
                            const isSelected = selectedRooms.some(r => r.id === room.id);
                            return (
                                <div
                                    key={room.id}
                                    onClick={() => toggleRoom(room)}
                                    className={`flex flex-col md:flex-row gap-6 p-6 border transition-all cursor-pointer ${isSelected ? "border-accent bg-accent/5 shadow-xl" : "border-gray-100 bg-white hover:border-gray-300"}`}
                                >
                                    <div className="relative w-full md:w-64 aspect-video md:aspect-square shrink-0">
                                        <Image src={room.image} alt={room.title} fill className="object-cover" />
                                        {room.features.includes("Split AC") && (
                                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-blue-500/90 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-bold">
                                                <Snowflake size={10} /> AC
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex-1 flex flex-col justify-center">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-2xl font-playfair font-bold text-primary">{room.title}</h3>
                                            {isSelected && <div className="bg-accent text-white p-1 rounded-full"><Check size={16} /></div>}
                                        </div>

                                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                                            <span className="flex items-center gap-1"><Users size={16} /> {room.guests} Guests</span>
                                            <span className="flex items-center gap-1"><Star size={16} className="text-yellow-400 fill-current" /> 4.9</span>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                                            {room.features.map((f, i) => (
                                                <span key={i} className={`text-xs font-inter px-2 py-1 ${f === "Split AC" ? "bg-blue-50 text-blue-600 font-bold" : "bg-gray-100 text-gray-600"}`}>
                                                    {f === "Split AC" ? `❄️ ${f}` : f}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="mt-auto">
                                            <span className="text-2xl font-bold text-primary">₹ {room.price.toLocaleString()}</span>
                                            <span className="text-xs text-muted-foreground"> / night</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Booking Form (Sticky) */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-6">
                            <div className="bg-white p-6 border border-gray-100 shadow-2xl">
                                <h3 className="text-2xl font-playfair font-bold mb-6">Reservation Summary</h3>

                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                                    {selectedRooms.length === 0 ? (
                                        <p className="text-sm text-amber-600 font-medium bg-amber-50 p-3 text-center">Please select at least one room to continue.</p>
                                    ) : (
                                        selectedRooms.map(room => (
                                            <div key={room.id} className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative flex-shrink-0">
                                                    <Image src={room.image} alt={room.title} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-primary text-sm">{room.title}</p>
                                                    <p className="text-xs text-muted-foreground">₹ {room.price.toLocaleString()} / night</p>
                                                </div>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleRoom(room);
                                                    }}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Check size={14} className="rotate-45" />
                                                </button>
                                            </div>
                                        ))
                                    )}
                                </div>

                                <form id="reservation-form" className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase text-gray-400">Check-in Date</label>
                                            <input
                                                type="date"
                                                value={checkIn}
                                                onChange={(e) => setCheckIn(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold uppercase text-gray-400">Check-out Date</label>
                                            <input
                                                type="date"
                                                value={checkOut}
                                                onChange={(e) => setCheckOut(e.target.value)}
                                                className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400">Full Name *</label>
                                        <input
                                            type="text"
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Enter your full name"
                                            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400">Phone Number *</label>
                                        <input
                                            type="tel"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            placeholder="Enter your phone number"
                                            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold uppercase text-gray-400">Email Address (Optional)</label>
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your email address"
                                            className="w-full bg-gray-50 border border-gray-200 px-4 py-3 text-sm font-medium focus:outline-none focus:border-accent"
                                        />
                                    </div>

                                    {/* Booking Time Policy */}
                                    <div className="bg-gray-50 p-3 text-xs text-gray-500 space-y-1">
                                        <p className="font-bold uppercase text-gray-600">Booking Policy</p>
                                        <p>• Check-in: <strong>1:00 PM</strong></p>
                                        <p>• Check-out: <strong>11:00 AM</strong></p>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex justify-between mb-6 text-lg font-bold text-primary pt-4 border-t border-gray-100">
                                            <span>Total ({selectedRooms.length} Rooms)</span>
                                            <span>₹ {subtotal.toLocaleString()}</span>
                                        </div>

                                        <button
                                            type="button"
                                            disabled={selectedRooms.length === 0}
                                            onClick={handleConfirmBooking}
                                            className="w-full bg-[#0F2822] text-[#D4AF37] font-bold py-4 rounded-none hover:bg-[#D4AF37] hover:text-[#0F2822] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            Confirm Booking
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Call Us to Book */}
                            <div className="bg-[#0F2822] text-white p-6 text-center">
                                <Phone size={24} className="mx-auto mb-3 text-[#D4AF37]" />
                                <p className="text-xs uppercase tracking-widest text-gray-400 mb-1">Prefer to book by phone?</p>
                                <p className="text-xl font-bold text-[#D4AF37] mb-2">Call Us to Book</p>
                                <a href="tel:8977665668" className="text-2xl font-bold hover:text-[#D4AF37] transition-colors">
                                    89776 65668
                                </a>
                                <p className="text-xs text-gray-400 mt-2">Available 24/7 for reservations</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Sticky Booking Bar */}
            <AnimatePresence>
                {selectedRooms.length > 0 && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 100, opacity: 0 }}
                        className="fixed bottom-0 left-0 right-0 z-[60] lg:hidden bg-white border-t border-gray-200 p-4 shadow-[0_-10px_30px_rgba(0,0,0,0.1)] backdrop-blur-md bg-white/95"
                    >
                        <div className="flex items-center justify-between gap-4 max-w-md mx-auto">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{selectedRooms.length} Room{selectedRooms.length > 1 ? 's' : ''} Selected</p>
                                <p className="text-2xl font-bold text-primary">₹ {subtotal.toLocaleString()}</p>
                            </div>
                            <button
                                onClick={handleMobileBookNow}
                                className="flex-1 bg-[#0F2822] text-[#D4AF37] font-bold py-4 rounded-none shadow-lg active:scale-95 transition-transform flex items-center justify-center gap-2"
                            >
                                <ShoppingBag size={20} />
                                Book Now
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
}

export default function BookingPage() {
    return (
        <Suspense fallback={<div className="text-center pt-20">Loading booking...</div>}>
            <BookingContent />
        </Suspense>
    );
}
