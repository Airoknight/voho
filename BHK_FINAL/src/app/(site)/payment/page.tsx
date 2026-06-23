"use client";

import { Header } from "../../../components/layout/header";
import { Footer } from "../../../components/layout/footer";
import { useState, useEffect } from "react";
import { CheckCircle, ArrowLeft, Lock, Upload, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const copyImageToClipboard = async (file: File): Promise<boolean> => {
    try {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        
        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d');
        if (!ctx) return false;
        
        ctx.drawImage(img, 0, 0);
        
        const blob = await new Promise<Blob | null>((resolve) => {
            canvas.toBlob((b) => resolve(b), 'image/png');
        });

        if (blob) {
            await navigator.clipboard.write([
                new ClipboardItem({
                    ['image/png']: blob
                })
            ]);
            return true;
        }
        return false;
    } catch (err) {
        console.error("Failed to copy image to clipboard:", err);
        return false;
    }
};

export default function PaymentPage() {
    const [bookingDetails, setBookingDetails] = useState<{
        fullName: string;
        email: string;
        phone: string;
        checkIn: string;
        checkOut: string;
        rooms: { id: string; title: string; price: number }[];
        total: number;
    } | null>(null);

     const [screenshot, setScreenshot] = useState<File | null>(null);
     const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
     const [isUploading, setIsUploading] = useState(false);
     const [isSuccess, setIsSuccess] = useState(false);
     const [uploadedReceiptUrl, setUploadedReceiptUrl] = useState<string>("");

    useEffect(() => {
        const saved = localStorage.getItem("temp_booking");
        if (saved) {
            try {
                setBookingDetails(JSON.parse(saved));
            } catch (e) {
                console.error("Error reading temp_booking from localStorage:", e);
            }
        }
    }, []);

    const subtotal = bookingDetails?.total || 4500;
    const taxes = subtotal * 0.12;
    const total = subtotal + taxes;

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setScreenshot(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshotPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveScreenshot = () => {
        setScreenshot(null);
        setScreenshotPreview(null);
    };

    const handleSendProof = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!screenshot) {
            alert("Please upload your payment screenshot first.");
            return;
        }

        setIsUploading(true);

        try {
            // 1. Upload screenshot to ImgBB (Auto-delete after 7 days = 604800 seconds)
            const formData = new FormData();
            formData.append("image", screenshot);
            
            const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY || "fad6e8893ef1f71604c2b0ee3b868ecc";
            const imgbbResponse = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbKey}&expiration=604800`, {
                method: "POST",
                body: formData
            });

            if (!imgbbResponse.ok) {
                throw new Error("Failed to upload screenshot to ImgBB.");
            }

            const imgbbData = await imgbbResponse.json();
            const receiptUrl = imgbbData.data.url;
            setUploadedReceiptUrl(receiptUrl);

            // 2. Save booking details + receipt URL to local backend
            const backendResponse = await fetch("http://localhost:5000/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    fullName: bookingDetails?.fullName || "Guest",
                    email: bookingDetails?.email || "N/A",
                    phone: bookingDetails?.phone || "N/A",
                    checkIn: bookingDetails?.checkIn || new Date().toISOString().split('T')[0],
                    checkOut: bookingDetails?.checkOut || new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    rooms: bookingDetails?.rooms || [{ title: "Room Reservation", price: subtotal }],
                    total: total,
                    receiptUrl: receiptUrl
                })
            });

            if (!backendResponse.ok) {
                console.warn("Could not save to local backend, proceeding anyway.");
            }

            // 3. Fallback: Copy receipt link to clipboard
            try {
                await navigator.clipboard.writeText(receiptUrl);
            } catch (clipErr) {
                console.warn("Failed to copy receipt URL to clipboard:", clipErr);
            }

            setIsUploading(false);
            setIsSuccess(true);

        } catch (error: any) {
            console.error("Payment submission failed:", error);
            alert(`Error: ${error.message || "Failed to process payment. Please try again."}`);
            setIsUploading(false);
        }
    };

    if (isSuccess) {
        const phone = "916300328336";
        const checkInStr = bookingDetails?.checkIn ? new Date(bookingDetails.checkIn).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : "Not Specified";
        const checkOutStr = bookingDetails?.checkOut ? new Date(bookingDetails.checkOut).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' }) : "Not Specified";
        const billDateStr = new Date().toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
        const roomsList = bookingDetails?.rooms?.map(r => `• ${r.title} (₹${r.price.toLocaleString()})`).join("\n") || "• Room Reservation";

        const textMessage = `Hello VOHO! I've just booked a stay and made the payment. Here are my booking details:

👤 *Name:* ${bookingDetails?.fullName || "Guest"}
📞 *Phone:* ${bookingDetails?.phone || "N/A"}
📧 *Email:* ${bookingDetails?.email || "N/A"}
📅 *Check-in Date:* ${checkInStr}
📅 *Check-out Date:* ${checkOutStr}
📅 *Bill Date:* ${billDateStr}

🏨 *Booked Accommodations:*
${roomsList}

💵 *Total Amount Paid:* ₹${total.toLocaleString()}`;

        const encodedText = encodeURIComponent(textMessage + `\n\n🖼️ *Receipt Link:* ${uploadedReceiptUrl || "Uploaded"}\n\n*Note:* Please verify my booking. Thank you!`);
        const whatsappUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;

        return (
            <main className="min-h-screen bg-[#0F2822] flex flex-col items-center justify-center text-center px-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-white p-8 md:p-12 shadow-2xl max-w-md w-full"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-green-600" />
                    </div>
                    
                    <h1 className="text-2xl md:text-3xl font-playfair font-bold text-[#0F2822] mb-4">Payment Proof Sent!</h1>
                    <p className="text-gray-500 mb-6 font-inter text-sm leading-relaxed text-center">
                        We have uploaded your receipt and saved your booking to our database.
                    </p>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-[#25D366] text-white font-bold py-4 hover:bg-[#20ba5a] transition-colors uppercase tracking-widest text-sm mb-4 shadow-md rounded text-center"
                    >
                        Send via WhatsApp →
                    </a>

                    {uploadedReceiptUrl && (
                        <p className="text-xs text-gray-500 mb-6">
                            Receipt URL: <a href={uploadedReceiptUrl} target="_blank" rel="noreferrer" className="text-[#0F2822] font-bold underline truncate max-w-xs inline-block align-bottom">{uploadedReceiptUrl}</a>
                        </p>
                    )}

                    <p className="text-xs text-gray-400 mb-8 font-inter leading-relaxed text-center">
                        💡 <strong>Note:</strong> The message includes your booking details and the public receipt link. You can also paste (**Ctrl+V**) to attach the image directly if needed.
                    </p>
                    
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded text-left text-xs mb-8 space-y-1">
                        <p className="font-bold text-gray-700 mb-2 uppercase">Booking Details Summary:</p>
                        <p>👤 <strong>Guest Name:</strong> {bookingDetails?.fullName || "Guest"}</p>
                        <p>📞 <strong>Phone:</strong> {bookingDetails?.phone || "N/A"}</p>
                        <p>🏨 <strong>Room(s):</strong> {bookingDetails?.rooms?.map(r => r.title).join(", ") || "Room Stay"}</p>
                        <p>📅 <strong>Check-in:</strong> {bookingDetails?.checkIn}</p>
                        <p>💵 <strong>Total Paid:</strong> ₹{total.toLocaleString()}</p>
                    </div>

                    <Link href="/" className="block w-full bg-[#0F2822] text-[#D4AF37] font-bold py-4 hover:bg-[#D4AF37] hover:text-[#0F2822] transition-colors uppercase tracking-widest text-xs">
                        Return to Home
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#f8f9fa]">
            <Header />

            <div className="pt-32 pb-24 container mx-auto px-4">
                <div className="mb-8">
                    <Link href="/booking" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-muted-foreground hover:text-[#0F2822] transition-colors">
                        <ArrowLeft size={16} /> Back to Booking
                    </Link>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Payment Form */}
                    <div className="lg:col-span-8">
                        <div className="bg-white border border-gray-100 shadow-xl overflow-hidden">
                            <div className="bg-[#0F2822] p-6 text-white flex items-center justify-between">
                                <h1 className="text-2xl font-playfair font-bold">Secure QR Payment</h1>
                                <div className="flex items-center gap-2 text-[#D4AF37] text-sm font-medium">
                                    <Lock size={16} /> 256-bit SSL Encrypted
                                </div>
                            </div>

                            <div className="p-8">
                                <div className="space-y-8">
                                    {/* Scan to Pay instruction */}
                                    <div className="text-center md:text-left">
                                        <h2 className="text-xl font-playfair font-bold text-[#0F2822] mb-2">Step 1: Scan & Pay via UPI QR Code</h2>
                                        <p className="text-gray-500 font-inter text-sm">
                                            Scan the QR code below using any UPI app (GPay, PhonePe, Paytm, BHIM, etc.) to pay the total amount of <strong className="text-[#0F2822]">₹{total.toLocaleString()}</strong>.
                                        </p>
                                    </div>

                                    {/* QR Code Container */}
                                    <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-100 p-6 md:p-10 rounded-lg">
                                        <div className="relative w-72 h-72 md:w-80 md:h-80 bg-white p-4 shadow-md rounded-xl border border-gray-200 hover:scale-105 transition-transform duration-300">
                                            <Image 
                                                src="/voho qr.jpeg" 
                                                alt="VOHO UPI Payment QR Code" 
                                                fill 
                                                className="object-contain p-2"
                                                priority
                                            />
                                        </div>
                                        <div className="mt-4 text-center">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D4AF37]/10 text-[#0F2822] text-xs font-bold uppercase tracking-wider rounded-full font-mono">
                                                UPI ID: vohobhimavaram@ybl
                                            </span>
                                        </div>
                                    </div>

                                    {/* Divider */}
                                    <div className="border-t border-gray-100 my-8" />

                                    {/* Upload Receipt Container */}
                                    <div>
                                        <div className="mb-4">
                                            <h2 className="text-xl font-playfair font-bold text-[#0F2822] mb-1">Step 2: Upload Payment Screenshot</h2>
                                            <p className="text-gray-500 font-inter text-sm">
                                                Please upload the screenshot of your successful transaction as proof of payment.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSendProof} className="space-y-6">
                                            {!screenshotPreview ? (
                                                <label className="border-2 border-dashed border-gray-300 hover:border-[#D4AF37] hover:bg-gray-50/50 transition-all rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer gap-3 text-gray-400 group">
                                                    <div className="p-3 bg-[#0F2822]/5 text-[#0F2822] rounded-full group-hover:bg-[#D4AF37]/10 group-hover:text-[#D4AF37] transition-colors">
                                                        <Upload size={24} />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-sm font-bold text-gray-700">Click to upload screenshot</p>
                                                        <p className="text-xs text-gray-400 mt-1">Supports JPEG, PNG (Max 5MB)</p>
                                                    </div>
                                                    <input 
                                                        type="file" 
                                                        accept="image/*" 
                                                        onChange={handleFileChange} 
                                                        className="hidden" 
                                                        required 
                                                    />
                                                </label>
                                            ) : (
                                                <div className="relative border border-gray-200 rounded-xl p-4 bg-gray-50">
                                                    <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-200">
                                                        <div className="flex items-center gap-2">
                                                            <CheckCircle size={16} className="text-green-600" />
                                                            <span className="text-sm font-bold text-gray-700 truncate max-w-[200px] md:max-w-md">
                                                                {screenshot?.name}
                                                            </span>
                                                        </div>
                                                        <button 
                                                            type="button" 
                                                            onClick={handleRemoveScreenshot}
                                                            className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-200 transition-colors"
                                                            title="Remove screenshot"
                                                        >
                                                            <X size={16} />
                                                        </button>
                                                    </div>
                                                    <div className="relative aspect-video max-h-64 w-full bg-white border rounded overflow-hidden">
                                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                                        <img 
                                                            src={screenshotPreview} 
                                                            alt="Payment Proof Preview" 
                                                            className="object-contain w-full h-full"
                                                        />
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={isUploading || !screenshot}
                                                className="w-full bg-[#0F2822] text-[#D4AF37] font-bold py-5 hover:bg-[#D4AF37] hover:text-[#0F2822] transition-all shadow-lg flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#0F2822] disabled:hover:text-[#D4AF37]"
                                            >
                                                {isUploading ? (
                                                    <span className="flex items-center gap-2">
                                                        Uploading Proof... 
                                                        <div className="w-4 h-4 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
                                                    </span>
                                                ) : (
                                                    <>
                                                        Confirm Booking & Send Proof via WhatsApp 
                                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                                    </>
                                                )}
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-4">
                        <div className="bg-white p-8 border border-gray-100 shadow-2xl sticky top-32">
                            <h3 className="text-xl font-playfair font-bold mb-6 text-[#0F2822]">Order Summary</h3>

                            {bookingDetails?.rooms && bookingDetails.rooms.length > 0 ? (
                                <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                                    {bookingDetails.rooms.map(room => (
                                        <div key={room.id} className="flex justify-between items-center text-sm font-inter">
                                            <div>
                                                <p className="font-bold text-gray-800">{room.title}</p>
                                                <p className="text-xs text-gray-400">Room Charge</p>
                                            </div>
                                            <span className="text-gray-600 font-medium">₹ {room.price.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="flex justify-between text-gray-600 text-sm mb-6 border-b border-gray-100 pb-6">
                                    <span>Room Charges</span>
                                    <span>₹ {subtotal.toLocaleString()}</span>
                                </div>
                            )}

                            <div className="space-y-4 text-sm font-inter border-b border-gray-100 pb-6 mb-6">
                                <div className="flex justify-between text-gray-600">
                                    <span>Taxes & Fees (12%)</span>
                                    <span>₹ {taxes.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-[#D4AF37] font-bold">
                                    <span>Discount</span>
                                    <span>- ₹ 0</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center text-2xl font-bold text-[#0F2822] mb-8">
                                <span>Total</span>
                                <span>₹ {total.toLocaleString()}</span>
                            </div>

                            {/* Show booking info preview if loaded */}
                            {bookingDetails && (
                                <div className="bg-gray-50 border border-gray-100 p-4 text-xs font-inter space-y-2 mb-6">
                                    <p className="font-bold uppercase text-[#0F2822] tracking-wider mb-2">Guest Information</p>
                                    <p className="text-gray-600">👤 Guest: <strong className="text-gray-800">{bookingDetails.fullName}</strong></p>
                                    <p className="text-gray-600">📞 Phone: <strong className="text-gray-800">{bookingDetails.phone || "N/A"}</strong></p>
                                    <p className="text-gray-600">📅 Check-in: <strong className="text-gray-800">{new Date(bookingDetails.checkIn).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</strong></p>
                                    <p className="text-gray-600">📅 Check-out: <strong className="text-gray-800">{new Date(bookingDetails.checkOut).toLocaleDateString("en-IN", { day: 'numeric', month: 'short', year: 'numeric' })}</strong></p>
                                </div>
                            )}

                            <div className="bg-gray-50 p-4 text-xs text-gray-500 leading-relaxed">
                                <p className="mb-2 font-bold uppercase text-gray-600">Cancellation Policy</p>
                                <p>Free cancellation up to 24 hours before check-in. Non-refundable thereafter.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
