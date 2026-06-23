import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// Removed framer-motion temporarily
import {
    ArrowLeft,
    User,
    Phone, // Kept used icons
    Calendar,
    CreditCard,
    MessageCircle,
    Save,
    FileText,
    Clock,
    CheckCircle,
    XCircle,
    Plus,
    AlertTriangle // Kept used icons
} from 'lucide-react';

// Sample booking data
const bookingsData = {
    'BK001': {
        id: 'BK001',
        guestName: 'Rajesh Kumar',
        phone: '+91 98765 43210',
        email: 'rajesh@email.com',
        apartment: 'The Royal Suite',
        apartmentId: 1,
        apartmentPrice: 3500,
        checkIn: '2026-01-29',
        checkOut: '2026-02-01',
        nights: 3,
        amount: 10500,
        paidAmount: 10500,
        pendingAmount: 0,
        paymentStatus: 'paid',
        status: 'confirmed',
        aadhar: 'XXXX-XXXX-1234',
        address: 'Hyderabad, Telangana',
        notes: 'Guest requested early check-in at 11 AM',
        bookingDate: '2026-01-25'
    },
    'BK002': {
        id: 'BK002',
        guestName: 'Priya Sharma',
        phone: '+91 87654 32109',
        email: 'priya@email.com',
        apartment: 'Modern Comfort Flat',
        apartmentId: 2,
        apartmentPrice: 3200,
        checkIn: '2026-01-30',
        checkOut: '2026-02-02',
        nights: 3,
        amount: 9600,
        paidAmount: 5000,
        pendingAmount: 4600,
        paymentStatus: 'partial',
        status: 'pending',
        aadhar: 'XXXX-XXXX-5678',
        address: 'Vijayawada, Andhra Pradesh',
        notes: '',
        bookingDate: '2026-01-26'
    },
    'BK003': {
        id: 'BK003',
        guestName: 'Anil Reddy',
        phone: '+91 76543 21098',
        email: 'anil@email.com',
        apartment: 'Executive Stay',
        apartmentId: 4,
        apartmentPrice: 4000,
        checkIn: '2026-01-31',
        checkOut: '2026-02-03',
        nights: 3,
        amount: 12000,
        paidAmount: 12000,
        pendingAmount: 0,
        paymentStatus: 'paid',
        status: 'confirmed',
        aadhar: 'XXXX-XXXX-9012',
        address: 'Guntur, Andhra Pradesh',
        notes: 'Business traveler, needs workspace',
        bookingDate: '2026-01-27'
    },
    'BK004': {
        id: 'BK004',
        guestName: 'Lakshmi Devi',
        phone: '+91 65432 10987',
        email: 'lakshmi@email.com',
        apartment: 'Cozy Family Haven',
        apartmentId: 3,
        apartmentPrice: 3000,
        checkIn: '2026-01-25',
        checkOut: '2026-01-28',
        nights: 3,
        amount: 9000,
        paidAmount: 9000,
        pendingAmount: 0,
        paymentStatus: 'paid',
        status: 'checked-in',
        aadhar: 'XXXX-XXXX-3456',
        address: 'Bhimavaram, Andhra Pradesh',
        notes: 'Family with kids',
        bookingDate: '2026-01-20'
    },
};

// Other bookings for availability check
const existingBookings = [
    { apartmentId: 1, checkIn: '2026-02-05', checkOut: '2026-02-08' },
    { apartmentId: 2, checkIn: '2026-02-03', checkOut: '2026-02-06' },
    { apartmentId: 3, checkIn: '2026-02-01', checkOut: '2026-02-04' },
    { apartmentId: 4, checkIn: '2026-02-04', checkOut: '2026-02-07' },
];

export default function BookingDetail() {
    const { id } = useParams();
    const navigate = useNavigate();

    const bookingData = bookingsData[id] || bookingsData['BK001'];

    const [booking, setBooking] = useState(bookingData);
    const [checkIn, setCheckIn] = useState(booking.checkIn);
    const [checkOut, setCheckOut] = useState(booking.checkOut);
    const [status, setStatus] = useState(booking.status);
    const [notes, setNotes] = useState(booking.notes);
    const [showSaveMessage, setShowSaveMessage] = useState(false);
    const [showExtendModal, setShowExtendModal] = useState(false);
    const [extendDate, setExtendDate] = useState(booking.checkOut);
    const [availabilityError, setAvailabilityError] = useState('');
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [cancelReason, setCancelReason] = useState('');

    const calculateNights = (start, end) => {
        const startDate = new Date(start);
        const endDate = new Date(end);
        const diff = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
        return diff > 0 ? diff : 0;
    };

    const calculateTotal = (start, end) => {
        return calculateNights(start, end) * booking.apartmentPrice;
    };

    const checkAvailability = (newCheckOut) => {
        const newEnd = new Date(newCheckOut);
        const currentEnd = new Date(booking.checkOut);

        if (newEnd <= currentEnd) {
            return { available: true };
        }

        // Check if apartment is available for extended dates
        for (const existing of existingBookings) {
            if (existing.apartmentId === booking.apartmentId) {
                const existingStart = new Date(existing.checkIn);
                const existingEnd = new Date(existing.checkOut);

                // Check if dates overlap
                if (newEnd > existingStart && currentEnd < existingEnd) {
                    return {
                        available: false,
                        message: `Apartment is already booked from ${existing.checkIn} to ${existing.checkOut}`
                    };
                }
            }
        }

        return { available: true };
    };

    const handleExtendStay = () => {
        const result = checkAvailability(extendDate);

        if (!result.available) {
            setAvailabilityError(result.message);
            return;
        }

        const nights = calculateNights(checkIn, extendDate);
        const newTotal = calculateTotal(checkIn, extendDate);
        const extraAmount = newTotal - booking.amount;

        setCheckOut(extendDate);
        setBooking(prev => ({
            ...prev,
            checkOut: extendDate,
            nights,
            amount: newTotal,
            pendingAmount: prev.pendingAmount + extraAmount,
            paymentStatus: extraAmount > 0 ? 'partial' : prev.paymentStatus
        }));

        setShowExtendModal(false);
        setAvailabilityError('');
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
    };

    const handleSave = () => {
        const nights = calculateNights(checkIn, checkOut);
        const newAmount = calculateTotal(checkIn, checkOut);

        setBooking(prev => ({
            ...prev,
            checkIn,
            checkOut,
            nights,
            amount: newAmount,
            status,
            notes
        }));

        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
    };

    const handleStatusChange = (newStatus) => {
        setStatus(newStatus);
        setBooking(prev => ({ ...prev, status: newStatus }));
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
    };

    const handleCancel = () => {
        setStatus('cancelled');
        setBooking(prev => ({ ...prev, status: 'cancelled', notes: `${prev.notes}\nCancellation reason: ${cancelReason}` }));
        setShowCancelModal(false);
        setShowSaveMessage(true);
        setTimeout(() => setShowSaveMessage(false), 3000);
    };

    const handleWhatsApp = (message) => {
        const phone = booking.phone.replace(/\s/g, '').replace('+', '');
        window.open(`https://wa.me/${phone}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const sendConfirmation = () => {
        handleWhatsApp(`Hello ${booking.guestName}, your booking at VOHO is confirmed!\n\nBooking ID: ${booking.id}\nApartment: ${booking.apartment}\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nTotal: Rs. ${booking.amount.toLocaleString()}\n\nThank you for choosing VOHO!`);
    };

    const sendExtensionNotice = () => {
        handleWhatsApp(`Hello ${booking.guestName}, your stay has been extended!\n\nNew Check-out: ${checkOut}\nTotal Nights: ${booking.nights}\nNew Total: Rs. ${booking.amount.toLocaleString()}\nPending Amount: Rs. ${booking.pendingAmount.toLocaleString()}\n\nThank you!`);
    };

    const sendCheckInReminder = () => {
        handleWhatsApp(`Hello ${booking.guestName}, this is a reminder for your check-in tomorrow at VOHO!\n\nApartment: ${booking.apartment}\nCheck-in Date: ${checkIn}\n\nWe look forward to hosting you!`);
    };

    const getStatusBadge = (status) => {
        const badges = {
            confirmed: 'badge badge-info',
            'checked-in': 'badge badge-active',
            completed: 'badge badge-success',
            cancelled: 'badge badge-error',
            pending: 'badge badge-warning'
        };
        return badges[status] || 'badge badge-neutral';
    };

    const nights = calculateNights(checkIn, checkOut);
    const currentTotal = calculateTotal(checkIn, checkOut);

    const btnStyle = {
        background: '#1F3D2A',
        color: 'white',
        padding: '10px 16px',
        borderRadius: '8px',
        fontWeight: 600,
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '14px'
    };

    const btnOutlineStyle = {
        background: 'transparent',
        color: '#374151',
        padding: '10px 16px',
        borderRadius: '8px',
        fontWeight: 600,
        border: '1px solid #d1d5db',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        fontSize: '14px'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: 500,
        color: '#4b5563',
        marginBottom: '6px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #d1d5db',
        fontSize: '14px',
        outline: 'none',
        transition: 'border-color 0.2s'
    };

    const infoRowStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '8px',
        fontSize: '14px'
    };

    return (
        <div className="page-container">
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                        onClick={() => navigate('/bookings')}
                        style={{ padding: '8px', background: 'transparent', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer' }}
                    >
                        <ArrowLeft size={20} color="#4b5563" />
                    </button>
                    <div>
                        <h1 style={{ fontSize: '20px', fontWeight: 600, color: '#111827' }}>Booking {booking.id}</h1>
                        <p style={{ fontSize: '13px', color: '#6b7280' }}>Booked on {booking.bookingDate}</p>
                    </div>
                </div>
                <span className={getStatusBadge(status)}>{status}</span>
            </div>

            {/* Success Message */}
            {showSaveMessage && (
                <div style={{
                    marginBottom: '20px',
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: '#def7ec',
                    color: '#03543f',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500
                }}>
                    <CheckCircle size={18} />
                    Changes saved successfully!
                </div>
            )}

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {/* Guest Information */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <User size={18} color="#6b7280" />
                        Guest Information
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Full Name</span>
                            <span style={{ fontWeight: 500, color: '#111827' }}>{booking.guestName}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Phone</span>
                            <span style={{ color: '#111827' }}>{booking.phone}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Email</span>
                            <span style={{ color: '#111827' }}>{booking.email}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Address</span>
                            <span style={{ color: '#111827' }}>{booking.address}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Aadhar</span>
                            <span style={{ color: '#111827' }}>{booking.aadhar}</span>
                        </div>
                    </div>

                    {/* ID Document */}
                    <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
                        <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <FileText size={14} />
                            ID Document
                        </p>
                        <div style={{ border: '2px dashed #e5e7eb', borderRadius: '8px', padding: '16px', textAlign: 'center', background: '#f9fafb' }}>
                            <FileText size={24} color="#d1d5db" style={{ margin: '0 auto 4px' }} />
                            <p style={{ fontSize: '12px', color: '#9ca3af' }}>Document uploaded</p>
                        </div>
                    </div>
                </div>

                {/* Booking Summary */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={18} color="#6b7280" />
                        Booking Summary
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label style={labelStyle}>Check-in Date</label>
                            <input
                                type="date"
                                value={checkIn}
                                onChange={(e) => setCheckIn(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <label style={labelStyle}>Check-out Date</label>
                            <input
                                type="date"
                                value={checkOut}
                                onChange={(e) => setCheckOut(e.target.value)}
                                style={inputStyle}
                            />
                        </div>

                        <div style={{ height: '1px', background: '#f3f4f6', margin: '4px 0' }}></div>

                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Nights</span>
                            <span style={{ fontWeight: 500 }}>{nights}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Rate/Night</span>
                            <span>Rs. {booking.apartmentPrice.toLocaleString()}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Total Amount</span>
                            <span style={{ fontSize: '16px', fontWeight: 700, color: '#1F3D2A' }}>Rs. {currentTotal.toLocaleString()}</span>
                        </div>

                        {/* Extend Stay Button */}
                        {(status === 'confirmed' || status === 'checked-in') && (
                            <button
                                onClick={() => setShowExtendModal(true)}
                                style={{ ...btnOutlineStyle, justifyContent: 'center', width: '100%', borderColor: '#1F3D2A', color: '#1F3D2A' }}
                            >
                                <Plus size={16} />
                                Extend Stay
                            </button>
                        )}
                    </div>
                </div>

                {/* Payment & Status */}
                <div className="card" style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <CreditCard size={18} color="#6b7280" />
                        Payment & Status
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Apartment</span>
                            <span style={{ fontWeight: 500, textAlign: 'right' }}>{booking.apartment}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Paid Amount</span>
                            <span style={{ color: '#16a34a', fontWeight: 600 }}>Rs. {booking.paidAmount.toLocaleString()}</span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Pending Amount</span>
                            <span style={{ color: booking.pendingAmount > 0 ? '#ea580c' : '#9ca3af', fontWeight: 600 }}>
                                Rs. {booking.pendingAmount.toLocaleString()}
                            </span>
                        </div>
                        <div style={infoRowStyle}>
                            <span style={{ color: '#6b7280' }}>Payment Status</span>
                            <span className={`badge ${booking.paymentStatus === 'paid' ? 'badge-success' : 'badge-warning'}`}>
                                {booking.paymentStatus}
                            </span>
                        </div>

                        <div style={{ height: '1px', background: '#f3f4f6', margin: '4px 0' }}></div>

                        <div>
                            <label style={labelStyle}>Booking Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                style={inputStyle}
                                disabled={status === 'cancelled' || status === 'completed'}
                            >
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="checked-in">Checked In</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>

                        {/* Quick Status Actions */}
                        {status === 'confirmed' && (
                            <button
                                onClick={() => handleStatusChange('checked-in')}
                                style={{ ...btnStyle, backgroundColor: '#16a34a', justifyContent: 'center' }}
                            >
                                <CheckCircle size={16} />
                                Mark as Checked-in
                            </button>
                        )}
                        {status === 'checked-in' && (
                            <button
                                onClick={() => handleStatusChange('completed')}
                                style={{ ...btnStyle, backgroundColor: '#16a34a', justifyContent: 'center' }}
                            >
                                <CheckCircle size={16} />
                                Mark as Checked-out
                            </button>
                        )}
                        {status !== 'cancelled' && status !== 'completed' && (
                            <button
                                onClick={() => setShowCancelModal(true)}
                                style={{ ...btnOutlineStyle, borderColor: '#fee2e2', color: '#ef4444', justifyContent: 'center' }}
                            >
                                <XCircle size={16} />
                                Cancel Booking
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Notes */}
            <div className="card" style={{ padding: '24px', marginTop: '20px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '12px' }}>Internal Notes</h3>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={3}
                    placeholder="Add notes about this booking..."
                    style={{ ...inputStyle, resize: 'none' }}
                />
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '24px' }}>
                <button onClick={handleSave} style={btnStyle}>
                    <Save size={16} />
                    Save Changes
                </button>
                <button onClick={sendConfirmation} style={btnOutlineStyle}>
                    <MessageCircle size={16} />
                    Send Confirmation
                </button>
                <button onClick={sendCheckInReminder} style={btnOutlineStyle}>
                    <Clock size={16} />
                    Send Reminder
                </button>
                {booking.pendingAmount > 0 && (
                    <button onClick={sendExtensionNotice} style={{ ...btnOutlineStyle, borderColor: '#fdba74', color: '#c2410c' }}>
                        <CreditCard size={16} />
                        Request Payment
                    </button>
                )}
            </div>

            {/* Extend Stay Modal - Simplified without Motion */}
            {showExtendModal && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
                    onClick={() => setShowExtendModal(false)}
                >
                    <div
                        style={{ background: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px', margin: '16px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Extend Stay</h3>
                            <button onClick={() => setShowExtendModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                <XCircle size={24} color="#9ca3af" />
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Current Check-out</label>
                                <p style={{ fontWeight: 500 }}>{checkOut}</p>
                            </div>
                            <div>
                                <label style={labelStyle}>New Check-out Date</label>
                                <input
                                    type="date"
                                    value={extendDate}
                                    min={checkOut}
                                    onChange={(e) => {
                                        setExtendDate(e.target.value);
                                        setAvailabilityError('');
                                    }}
                                    style={inputStyle}
                                />
                            </div>

                            {extendDate > checkOut && (
                                <div style={{ background: '#f9fafb', padding: '12px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: '#6b7280' }}>Extra Nights</span>
                                        <span style={{ fontWeight: 500 }}>{calculateNights(checkOut, extendDate)}</span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                                        <span style={{ color: '#6b7280' }}>Extra Amount</span>
                                        <span style={{ fontWeight: 600, color: '#ea580c' }}>
                                            Rs. {(calculateTotal(checkOut, extendDate)).toLocaleString()}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                                        <span>New Total</span>
                                        <span style={{ color: '#1F3D2A' }}>
                                            Rs. {calculateTotal(checkIn, extendDate).toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {availabilityError && (
                                <div style={{ background: '#fde8e8', color: '#9b1c1c', padding: '10px', borderRadius: '8px', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                                    <AlertTriangle size={16} />
                                    {availabilityError}
                                </div>
                            )}
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button onClick={() => setShowExtendModal(false)} style={{ ...btnOutlineStyle, flex: 1, justifyContent: 'center' }}>
                                Cancel
                            </button>
                            <button onClick={handleExtendStay} style={{ ...btnStyle, flex: 1, justifyContent: 'center' }}>
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Cancel Booking Modal */}
            {showCancelModal && (
                <div
                    style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}
                    onClick={() => setShowCancelModal(false)}
                >
                    <div
                        style={{ background: 'white', borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px', margin: '16px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: 600 }}>Cancel Booking</h3>
                            <button onClick={() => setShowCancelModal(false)} style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}>
                                <XCircle size={24} color="#9ca3af" />
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <p style={{ color: '#4b5563', fontSize: '14px' }}>Are you sure you want to cancel this booking? This action cannot be undone.</p>
                            <div>
                                <label style={labelStyle}>Cancellation Reason</label>
                                <select
                                    value={cancelReason}
                                    onChange={(e) => setCancelReason(e.target.value)}
                                    style={inputStyle}
                                >
                                    <option value="">Select a reason</option>
                                    <option value="Guest request">Guest request</option>
                                    <option value="No show">No show</option>
                                    <option value="Payment issue">Payment issue</option>
                                    <option value="Double booking">Double booking</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                            <button onClick={() => setShowCancelModal(false)} style={{ ...btnOutlineStyle, flex: 1, justifyContent: 'center' }}>
                                Keep Booking
                            </button>
                            <button
                                onClick={handleCancel}
                                disabled={!cancelReason}
                                style={{ ...btnStyle, flex: 1, justifyContent: 'center', background: '#ef4444', opacity: cancelReason ? 1 : 0.7 }}
                            >
                                Cancel Booking
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
