"use client";

import { Header } from "../../../components/layout/header";
import { imagePath } from "../../../lib/utils";

const galleryData = [
    { title: 'Deck View', image: imagePath('/images/deck1.jpg'), description: 'Open skies and fresh air.' },
    { title: 'Luxury Flat', image: imagePath('/images/flat1.jpg'), description: 'Spacious modern living.' },
    { title: 'Royal Suite', image: imagePath('/images/suite1.jpg'), description: 'Premium comfort.' },
    { title: 'Deck Lounge', image: imagePath('/images/deck2.jpg'), description: 'Relax outdoors.' },
    { title: 'Bedroom', image: imagePath('/images/flat2-1.jpg'), description: 'Cozy and elegant.' },
    { title: 'Suite Detail', image: imagePath('/images/suite2.jpg'), description: 'Fine interiors.' },
];

export default function GalleryPage() {
    return (
        <main className="min-h-screen bg-neutral-900 selection:bg-accent selection:text-white pb-12">
            <Header />

            <div className="pt-32 pb-12 text-center text-white">
                <h1 className="text-6xl md:text-8xl font-playfair font-bold mb-4">Gallery</h1>
                <p className="text-white/60 font-inter text-lg">Explore the aesthetic of VOHO</p>
            </div>

            <div className="container mx-auto px-4">
                <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                    {/* Main highlight shots */}
                    {galleryData.map((item, index) => (
                        <div key={index} className="break-inside-avoid relative group overflow-hidden rounded-xl">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="font-playfair text-2xl font-bold">{item.title}</h3>
                                <p className="font-inter text-sm mt-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{item.description}</p>
                            </div>
                        </div>
                    ))}

                    {/* Complete collection of user images */}
                    {[
                        imagePath('/images/deck3.jpg'), imagePath('/images/deck4.jpg'),
                        imagePath('/images/flat2.jpg'), imagePath('/images/flat3.jpg'), imagePath('/images/flat4.jpg'), imagePath('/images/flat5.jpg'), imagePath('/images/flat6.jpg'), imagePath('/images/flat7.jpg'),
                        imagePath('/images/flat2-2.jpg'), imagePath('/images/flat2-3.jpg'), imagePath('/images/flat2-4.jpg'), imagePath('/images/flat2-5.jpg'), imagePath('/images/flat2-6.jpg')
                    ].map((src, i) => (
                        <div key={`extra-${i}`} className="break-inside-avoid relative group overflow-hidden rounded-xl">
                            <img
                                src={src}
                                alt="Gallery Image"
                                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
                                <h3 className="font-playfair text-xl font-bold">VOHO Moments</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </main>
    );
}
