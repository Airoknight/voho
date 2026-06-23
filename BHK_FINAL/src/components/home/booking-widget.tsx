"use client";

import { useState } from "react";
import { cn } from "../../lib/utils";
import { Search, Calendar, User, Minus, Plus, ArrowRight } from "lucide-react";

export function BookingWidget() {
    const [adults, setAdults] = useState(2);
    const [children, setChildren] = useState(0);
    const [rooms, setRooms] = useState(1);

    return (
        <div className="bg-white shadow-2xl p-6 lg:p-10 flex flex-col lg:flex-row gap-6 items-center lg:items-end w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 w-full lg:w-3/4">

                {/* Location */}
                <div className="lg:col-span-12">
                    <div className="relative">
                        <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                        <select className="w-full border-b border-gray-200 py-3 pl-8 pr-4 text-primary font-medium focus:outline-none focus:border-accent appearance-none bg-transparent cursor-pointer">
                            <option value="" disabled selected>Where are you going?</option>
                            <option value="yerevan">Yerevan</option>
                            <option value="gyumri">Gyumri</option>
                            <option value="dilijan">Dilijan</option>
                            <option value="tsaghkadzor">Tsaghkadzor</option>
                        </select>
                    </div>
                </div>

                {/* Check In */}
                <div className="lg:col-span-6">
                    <div className="relative group">
                        <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Arrival" className="w-full border-b border-gray-200 py-3 pr-4 text-primary font-medium focus:outline-none focus:border-accent bg-transparent placeholder:text-gray-400" />
                        <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-accent transition-colors" />
                    </div>
                </div>

                {/* Check Out */}
                <div className="lg:col-span-6">
                    <div className="relative group">
                        <input type="text" onFocus={(e) => e.target.type = 'date'} onBlur={(e) => e.target.type = 'text'} placeholder="Departure" className="w-full border-b border-gray-200 py-3 pr-4 text-primary font-medium focus:outline-none focus:border-accent bg-transparent placeholder:text-gray-400" />
                        <Calendar className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none group-focus-within:text-accent transition-colors" />
                    </div>
                </div>

                {/* Guests - Adults */}
                <div className="lg:col-span-6">
                    <div className="flex items-center justify-between border-b border-gray-200 py-3">
                        <span className="text-gray-400 text-sm">Adults (16+)</span>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setAdults(Math.max(1, adults - 1))} className="text-gray-400 hover:text-primary transition-colors"><Minus size={16} /></button>
                            <span className="font-medium w-4 text-center">{adults}</span>
                            <button onClick={() => setAdults(adults + 1)} className="text-gray-400 hover:text-primary transition-colors"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Guests - Children */}
                <div className="lg:col-span-6">
                    <div className="flex items-center justify-between border-b border-gray-200 py-3">
                        <span className="text-gray-400 text-sm">Children (0-15)</span>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setChildren(Math.max(0, children - 1))} className="text-gray-400 hover:text-primary transition-colors"><Minus size={16} /></button>
                            <span className="font-medium w-4 text-center">{children}</span>
                            <button onClick={() => setChildren(children + 1)} className="text-gray-400 hover:text-primary transition-colors"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>

                {/* Rooms */}
                <div className="lg:col-span-12">
                    <div className="flex items-center justify-between border-b border-gray-200 py-3">
                        <span className="text-gray-400 text-sm">Rooms</span>
                        <div className="flex items-center gap-3">
                            <button onClick={() => setRooms(Math.max(1, rooms - 1))} className="text-gray-400 hover:text-primary transition-colors"><Minus size={16} /></button>
                            <span className="font-medium w-4 text-center">{rooms}</span>
                            <button onClick={() => setRooms(rooms + 1)} className="text-gray-400 hover:text-primary transition-colors"><Plus size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Submit Button */}
            <div className="w-full lg:w-1/4 flex justify-end">
                <button className="bg-primary hover:bg-primary/90 text-white rounded-[2rem] px-8 py-4 sm:py-6 w-full lg:w-auto flex items-center justify-center gap-2 font-bold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/20">
                    <span className="hidden lg:inline">Armenia, here I go</span>
                    <span className="lg:hidden">Search</span>
                    <div className="bg-white/20 rounded-full p-1">
                        <ArrowRight size={16} />
                    </div>
                </button>
            </div>
        </div>
    );
}
