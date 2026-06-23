import { useState } from 'react';
import { Lock, Unlock, Info, Shield } from 'lucide-react';
import CalendarView from '../components/CalendarView';

// Sample bookings data with matched room names
const sampleBookings = [
    { id: 'BK001', guestName: 'Rajesh Kumar', apartment: 'Flat 1', checkIn: '2026-01-29', checkOut: '2026-02-01', status: 'confirmed' },
    { id: 'BK002', guestName: 'Priya Sharma', apartment: 'Flat 2', checkIn: '2026-01-30', checkOut: '2026-02-02', status: 'confirmed' },
    { id: 'BK003', guestName: 'Anil Reddy', apartment: 'Deck Room', checkIn: '2026-01-31', checkOut: '2026-02-03', status: 'confirmed' },
    { id: 'BK004', guestName: 'Lakshmi Devi', apartment: 'Suite Room', checkIn: '2026-02-05', checkOut: '2026-02-08', status: 'confirmed' },
    { id: 'BK005', guestName: 'Venkat Rao', apartment: 'Flat 1', checkIn: '2026-02-10', checkOut: '2026-02-14', status: 'confirmed' },
    { id: 'BK006', guestName: 'Srinivas M', apartment: 'Flat 2', checkIn: '2026-02-08', checkOut: '2026-02-11', status: 'confirmed' },
    { id: 'BK007', guestName: 'Meera Patel', apartment: 'Open Area', checkIn: '2026-02-12', checkOut: '2026-02-13', status: 'confirmed' },
];

export default function Calendar() {
    // Per-room blocked dates: { roomName: { [dateStr]: { blockedBy: email } } }
    const [blockedDates, setBlockedDates] = useState({
        'Suite Room': { '2026-02-15': { blockedBy: 'admin@voho.in' }, '2026-02-16': { blockedBy: 'admin@voho.in' } },
    });

    const getUserEmail = () => {
        try {
            const user = JSON.parse(localStorage.getItem('currentUser'));
            return user?.email || 'admin@voho.in';
        } catch (e) {
            return 'admin@voho.in';
        }
    };

    const handleToggleAvailability = (roomName, dateStr) => {
        setBlockedDates(prev => {
            const roomData = prev[roomName] || {};
            if (roomData[dateStr]) {
                const updated = { ...roomData };
                delete updated[dateStr];
                return { ...prev, [roomName]: updated };
            } else {
                const email = getUserEmail();
                return {
                    ...prev,
                    [roomName]: {
                        ...roomData,
                        [dateStr]: { blockedBy: email }
                    }
                };
            }
        });
    };

    const totalBlocked = Object.values(blockedDates).reduce((acc, datesObj) => acc + Object.keys(datesObj).length, 0);

    const clearAllBlocked = () => setBlockedDates({});

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Calendar & Availability</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>View bookings by date and manage room-wise availability</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#6b7280' }}>
                        <Lock size={14} color="#ef4444" />
                        <span>{totalBlocked} dates blocked</span>
                    </div>
                    {totalBlocked > 0 && (
                        <button
                            onClick={clearAllBlocked}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                padding: '6px 12px',
                                background: 'transparent',
                                border: '1px solid #e5e7eb',
                                borderRadius: '6px',
                                color: '#374151',
                                fontSize: '13px',
                                fontWeight: 500,
                                cursor: 'pointer'
                            }}
                        >
                            <Unlock size={14} />
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Calendar */}
            <CalendarView
                bookings={sampleBookings}
                blockedDates={blockedDates}
                onToggleAvailability={handleToggleAvailability}
            />

            {/* Instructions */}
            <div style={{
                background: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '20px',
                marginTop: '24px'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                    <Shield size={16} color="#D4AF37" />
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>How to Manage Availability</h3>
                </div>
                <ul style={{ fontSize: '14px', color: '#4b5563', paddingLeft: '20px', lineHeight: '2', margin: 0 }}>
                    <li>Select a <strong style={{ color: '#111827' }}>specific room tab</strong> to view only that room's bookings and availability</li>
                    <li>Click on any cell to <strong style={{ color: '#111827' }}>block/unblock</strong> that room for a specific date</li>
                    <li>Each room is managed <strong style={{ color: '#111827' }}>independently</strong> – blocking a date only affects the selected room</li>
                    <li>Color-coded booking bars show guest names. Click a booking bar to see <strong style={{ color: '#111827' }}>guest details and receipt</strong></li>
                    <li>Past dates are dimmed and cannot be modified</li>
                </ul>
            </div>
        </div>
    );
}
