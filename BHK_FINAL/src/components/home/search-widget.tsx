"use client";

import { useState } from "react";
import { Search, Calendar, Users, MapPin } from "lucide-react";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

export function SearchWidget() {
    return (
        <div className="bg-white rounded-xl shadow-2xl p-4 md:p-2 max-w-5xl mx-auto -mt-10 relative z-40 flex flex-col md:flex-row gap-4 md:gap-2 items-center border border-gray-100">
            {/* Location */}
            <div className="flex-1 w-full md:border-r md:border-gray-200 px-4 py-2 relative group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Location</label>
                <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="text-primary font-bold text-lg">Where to?</span>
                </div>
            </div>

            {/* Check In */}
            <div className="flex-1 w-full md:border-r md:border-gray-200 px-4 py-2 relative group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Check In</label>
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="text-primary font-bold text-lg">Add Dates</span>
                </div>
            </div>

            {/* Check Out */}
            <div className="flex-1 w-full md:border-r md:border-gray-200 px-4 py-2 relative group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Check Out</label>
                <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="text-primary font-bold text-lg">Add Dates</span>
                </div>
            </div>

            {/* Guests */}
            <div className="flex-1 w-full px-4 py-2 relative group cursor-pointer hover:bg-gray-50 rounded-lg transition-colors">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 block">Guests</label>
                <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-gray-400 group-hover:text-primary transition-colors" />
                    <span className="text-primary font-bold text-lg">1 Guest</span>
                </div>
            </div>

            {/* Search Button */}
            <Button className="w-full md:w-auto h-14 md:h-16 px-8 rounded-lg bg-brand-yellow text-primary hover:bg-brand-yellow/90 font-black text-lg uppercase tracking-wide flex items-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                <Search className="w-6 h-6" />
                Search
            </Button>
        </div>
    );
}
