import { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, Lock, X, FileText, Phone, Calendar, User } from 'lucide-react';

const apartments = [
    { id: 1, name: 'Flat 1', color: '#D4AF37' },
    { id: 2, name: 'Flat 2', color: '#22c55e' },
    { id: 3, name: 'Flat 3', color: '#3b82f6' },
    { id: 4, name: 'Flat 4', color: '#a855f7' },
    { id: 5, name: 'Suite Room', color: '#f97316' },
    { id: 6, name: 'Deck Room', color: '#ec4899' },
    { id: 7, name: 'Open Area', color: '#6366f1' },
];

const CELL_WIDTH = 48;

export default function CalendarView({ bookings = [], blockedDates = {}, onToggleAvailability }) {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const scrollContainerRef = useRef(null);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const getDaysInMonth = (date) => {
        const year = date.getFullYear();
        const month = date.getMonth();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        return { daysInMonth, year, month };
    };

    const { daysInMonth, year, month } = getDaysInMonth(currentDate);

    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
    const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

    const formatDateString = (y, m, d) => {
        return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    };

    const isPastDate = (y, m, d) => {
        const date = new Date(y, m, d);
        return date < today;
    };

    const isRoomBlocked = (roomName, dateStr) => {
        return blockedDates[roomName] && blockedDates[roomName][dateStr];
    };

    const handleDateClick = (day, roomName) => {
        const dateStr = formatDateString(year, month, day);
        if (isPastDate(year, month, day)) return;
        if (onToggleAvailability) {
            onToggleAvailability(roomName, dateStr);
        }
    };

    const getBookingPosition = (booking, year, month) => {
        const checkIn = new Date(booking.checkIn);
        const checkOut = new Date(booking.checkOut);
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        if (checkOut <= monthStart || checkIn > monthEnd) return null;

        const effectiveStart = checkIn < monthStart ? monthStart : checkIn;
        const effectiveEnd = checkOut > monthEnd ? monthEnd : checkOut;

        const startDay = effectiveStart.getDate();
        const duration = Math.ceil((effectiveEnd - effectiveStart) / (1000 * 60 * 60 * 24));

        const width = Math.max(1, duration) * CELL_WIDTH;
        const left = (startDay - 1) * CELL_WIDTH;

        return { left, width };
    };

    const displayedRooms = selectedRoom
        ? apartments.filter(a => a.id === selectedRoom)
        : apartments;

    const getOccupancyForDay = (day) => {
        const dateStr = formatDateString(year, month, day);
        const date = new Date(year, month, day);
        let occupied = 0;
        let blocked = 0;
        apartments.forEach(apt => {
            if (isRoomBlocked(apt.name, dateStr)) {
                blocked++;
            } else if (bookings.some(b => {
                const ci = new Date(b.checkIn);
                const co = new Date(b.checkOut);
                return b.apartment === apt.name && date >= ci && date < co;
            })) {
                occupied++;
            }
        });
        return { occupied, blocked, available: apartments.length - occupied - blocked };
    };

    const renderTimelineHeader = () => {
        const days = [];
        for (let i = 1; i <= daysInMonth; i++) {
            const date = new Date(year, month, i);
            const isToday = new Date().toDateString() === date.toDateString();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const past = isPastDate(year, month, i);
            const occ = getOccupancyForDay(i);

            days.push(
                <div
                    key={i}
                    style={{
                        width: `${CELL_WIDTH}px`,
                        minWidth: `${CELL_WIDTH}px`,
                        textAlign: 'center',
                        padding: '6px 0',
                        fontSize: '11px',
                        color: past ? '#c7c7c7' : (isToday ? '#D4AF37' : (isWeekend ? '#9ca3af' : '#374151')),
                        fontWeight: isToday ? 700 : 500,
                        backgroundColor: isToday ? 'rgba(212,175,55,0.08)' : 'transparent',
                        borderRight: '1px solid #f3f4f6',
                        position: 'relative'
                    }}
                >
                    <div style={{ marginBottom: '1px', fontSize: '9px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {date.toLocaleDateString('en-US', { weekday: 'short' }).charAt(0)}
                    </div>
                    <div style={{ fontWeight: 600 }}>{i}</div>
                    <div style={{ display: 'flex', gap: '1px', justifyContent: 'center', marginTop: '3px' }}>
                        {occ.available > 0 && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#22c55e' }} />}
                        {occ.occupied > 0 && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#D4AF37' }} />}
                        {occ.blocked > 0 && <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: '#ef4444' }} />}
                    </div>
                </div>
            );
        }
        return days;
    };

    const renderGridRows = () => {
        return displayedRooms.map(apt => {
            const aptBookings = bookings.filter(b => b.apartment === apt.name);

            return (
                <div key={apt.id} style={{
                    height: '56px',
                    borderBottom: '1px solid #f3f4f6',
                    position: 'relative',
                    display: 'flex'
                }}>
                    {Array.from({ length: daysInMonth }).map((_, i) => {
                        const dateStr = formatDateString(year, month, i + 1);
                        const blockedData = isRoomBlocked(apt.name, dateStr);
                        const blocked = !!blockedData;
                        const past = isPastDate(year, month, i + 1);
                        const isWeekend = new Date(year, month, i + 1).getDay() === 0 || new Date(year, month, i + 1).getDay() === 6;
                        const isToday = new Date().toDateString() === new Date(year, month, i + 1).toDateString();

                        return (
                            <div
                                key={i}
                                onClick={() => handleDateClick(i + 1, apt.name)}
                                style={{
                                    width: `${CELL_WIDTH}px`,
                                    minWidth: `${CELL_WIDTH}px`,
                                    height: '100%',
                                    borderRight: '1px solid #f3f4f6',
                                    background: blocked
                                        ? 'rgba(239,68,68,0.08)'
                                        : isToday
                                            ? 'rgba(212,175,55,0.05)'
                                            : (past ? '#fafafa' : (isWeekend ? '#fafbfc' : 'transparent')),
                                    cursor: past ? 'not-allowed' : 'pointer',
                                    position: 'relative'
                                }}
                                title={blocked ? `${apt.name} - Blocked by ${blockedData.blockedBy}. Click to unblock.` : (past ? 'Past date' : `${apt.name} - Available. Click to block`)}
                            >
                                {blocked && (
                                    <Lock size={10} style={{ position: 'absolute', top: '3px', right: '3px', color: '#ef4444', opacity: 0.6 }} />
                                )}
                            </div>
                        );
                    })}

                    {aptBookings.map(booking => {
                        const pos = getBookingPosition(booking, year, month);
                        if (!pos) return null;

                        return (
                            <div
                                key={booking.id}
                                onClick={(e) => { e.stopPropagation(); setSelectedBooking({ ...booking, apartment: apt.name, color: apt.color }); }}
                                style={{
                                    position: 'absolute',
                                    left: `${pos.left}px`,
                                    width: `${pos.width - 4}px`,
                                    top: '8px',
                                    height: '40px',
                                    backgroundColor: apt.color + '20',
                                    borderLeft: `3px solid ${apt.color}`,
                                    borderRadius: '4px',
                                    padding: '4px 8px',
                                    fontSize: '11px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    color: '#374151',
                                    cursor: 'pointer',
                                    zIndex: 10,
                                    marginLeft: '2px',
                                    transition: 'transform 0.1s ease, box-shadow 0.1s ease'
                                }}
                                title={`${booking.guestName}\n${apt.name}\n${booking.checkIn} to ${booking.checkOut}`}
                                onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.02)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)'; }}
                                onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                            >
                                <div style={{ fontWeight: 600, fontSize: '11px', color: '#111827' }}>{booking.guestName}</div>
                                <div style={{ fontSize: '9px', color: '#6b7280' }}>
                                    {booking.status || 'Booked'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            );
        });
    };

    const BookingModal = () => {
        if (!selectedBooking) return null;

        return (
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(4px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000
            }} onClick={() => setSelectedBooking(null)}>
                <div style={{
                    background: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #e5e7eb',
                    width: '90%',
                    maxWidth: '480px',
                    maxHeight: '90vh',
                    overflow: 'auto',
                    boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)'
                }} onClick={(e) => e.stopPropagation()}>
                    {/* Header */}
                    <div style={{
                        padding: '20px',
                        borderBottom: '1px solid #e5e7eb',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                                width: '40px',
                                height: '40px',
                                background: selectedBooking.color + '20',
                                borderRadius: '8px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <User size={20} color={selectedBooking.color} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>{selectedBooking.guestName}</h3>
                                <p style={{ fontSize: '13px', color: '#6b7280' }}>{selectedBooking.id}</p>
                            </div>
                        </div>
                        <button onClick={() => setSelectedBooking(null)} style={{ background: '#f3f4f6', border: 'none', cursor: 'pointer', padding: '8px', borderRadius: '6px' }}>
                            <X size={20} color="#6b7280" />
                        </button>
                    </div>

                    {/* Details */}
                    <div style={{ padding: '20px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={16} color="#D4AF37" />
                                <div>
                                    <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Check-in</p>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{selectedBooking.checkIn}</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Calendar size={16} color="#D4AF37" />
                                <div>
                                    <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>Check-out</p>
                                    <p style={{ fontSize: '14px', fontWeight: 500, color: '#111827' }}>{selectedBooking.checkOut}</p>
                                </div>
                            </div>
                        </div>

                        <div style={{ padding: '16px', background: '#f9fafb', borderRadius: '8px', marginBottom: '16px' }}>
                            <p style={{ fontSize: '12px', fontWeight: 600, color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Room Details</p>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: selectedBooking.color }}></div>
                                <span style={{ fontSize: '14px', color: '#111827', fontWeight: 500 }}>{selectedBooking.apartment}</span>
                            </div>
                        </div>

                        {/* Receipt */}
                        <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                                <FileText size={16} color="#D4AF37" />
                                <p style={{ fontSize: '13px', fontWeight: 600, color: '#111827' }}>Receipt</p>
                            </div>
                            <div style={{ fontSize: '13px', color: '#4b5563' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Room Charges (3 nights)</span>
                                    <span>₹10,500</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span>Taxes & Fees</span>
                                    <span>₹1,260</span>
                                </div>
                                <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '8px', marginTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 700, color: '#111827', fontSize: '15px' }}>
                                    <span>Total</span>
                                    <span>₹11,760</span>
                                </div>
                            </div>
                        </div>

                        <div style={{ marginTop: '16px' }}>
                            <button style={{
                                width: '100%',
                                padding: '12px',
                                background: '#0F2822',
                                color: '#D4AF37',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '13px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '6px',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}>
                                <Phone size={14} />
                                Contact Guest
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <div style={{
                background: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Header */}
                <div style={{
                    padding: '16px 24px',
                    borderBottom: '1px solid #e5e7eb',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: '#ffffff'
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827' }}>
                            {monthNames[month]} {year}
                        </h3>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <button onClick={prevMonth} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#374151', display: 'flex' }}>
                                <ChevronLeft size={16} />
                            </button>
                            <button onClick={nextMonth} style={{ background: '#f3f4f6', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '6px', cursor: 'pointer', color: '#374151', display: 'flex' }}>
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Legend */}
                    <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: '#6b7280' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} /> Available
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#D4AF37' }} /> Booked
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} /> Blocked
                        </span>
                    </div>
                </div>

                {/* Room Selector Tabs */}
                <div style={{
                    display: 'flex',
                    gap: '0',
                    borderBottom: '1px solid #e5e7eb',
                    background: '#f9fafb',
                    overflowX: 'auto'
                }}>
                    <button
                        onClick={() => setSelectedRoom(null)}
                        style={{
                            padding: '10px 20px',
                            background: selectedRoom === null ? '#0F2822' : 'transparent',
                            color: selectedRoom === null ? '#D4AF37' : '#6b7280',
                            border: 'none',
                            fontSize: '12px',
                            fontWeight: 600,
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                            whiteSpace: 'nowrap',
                            borderRight: '1px solid #e5e7eb'
                        }}
                    >
                        All Rooms
                    </button>
                    {apartments.map(apt => (
                        <button
                            key={apt.id}
                            onClick={() => setSelectedRoom(apt.id)}
                            style={{
                                padding: '10px 20px',
                                background: selectedRoom === apt.id ? apt.color : 'transparent',
                                color: selectedRoom === apt.id ? '#ffffff' : '#6b7280',
                                border: 'none',
                                fontSize: '12px',
                                fontWeight: selectedRoom === apt.id ? 700 : 500,
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '0.5px',
                                whiteSpace: 'nowrap',
                                borderRight: '1px solid #e5e7eb',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '6px'
                            }}
                        >
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: selectedRoom === apt.id ? '#fff' : apt.color }} />
                            {apt.name}
                        </button>
                    ))}
                </div>

                {/* Main Content */}
                <div style={{ display: 'flex', overflow: 'hidden' }}>
                    {/* Sidebar */}
                    <div style={{
                        width: '160px',
                        minWidth: '160px',
                        borderRight: '1px solid #e5e7eb',
                        background: '#f9fafb',
                        zIndex: 20
                    }}>
                        <div style={{
                            height: '52px',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 16px',
                            fontSize: '10px',
                            fontWeight: 700,
                            color: '#9ca3af',
                            textTransform: 'uppercase',
                            letterSpacing: '1.5px',
                            background: '#f3f4f6'
                        }}>
                            Rooms
                        </div>
                        {displayedRooms.map(apt => {
                            const roomBlockedCount = blockedDates[apt.name] ? Object.keys(blockedDates[apt.name]).length : 0;
                            return (
                                <div key={apt.id} style={{
                                    height: '56px',
                                    borderBottom: '1px solid #f3f4f6',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '0 16px',
                                    gap: '10px'
                                }}>
                                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: apt.color }}></div>
                                    <div>
                                        <span style={{ fontSize: '13px', fontWeight: 500, color: '#111827' }}>{apt.name}</span>
                                        {roomBlockedCount > 0 && (
                                            <span style={{ fontSize: '9px', color: '#ef4444', display: 'block' }}>
                                                {roomBlockedCount} blocked
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Timeline */}
                    <div
                        ref={scrollContainerRef}
                        style={{
                            flex: 1,
                            overflowX: 'auto',
                            overflowY: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <div style={{ minWidth: `${daysInMonth * CELL_WIDTH}px` }}>
                            <div style={{
                                height: '52px',
                                display: 'flex',
                                borderBottom: '1px solid #e5e7eb',
                                background: '#f3f4f6'
                            }}>
                                {renderTimelineHeader()}
                            </div>
                            <div>
                                {renderGridRows()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <BookingModal />
        </>
    );
}
