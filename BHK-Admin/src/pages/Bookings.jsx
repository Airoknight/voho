import { useState, useEffect } from 'react';
import BookingTable from '../components/BookingTable';



export default function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/bookings');
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            }
        } catch (e) {
            console.error('Failed to fetch bookings:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handleStatusChange = async (bookingId, newStatus) => {
        try {
            const response = await fetch(`http://localhost:5000/api/bookings/${bookingId}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (response.ok) {
                fetchBookings();
            }
        } catch (e) {
            console.error('Failed to update status:', e);
        }
    };

    const activeCount = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in').length;
    const pendingCount = bookings.filter(b => b.status === 'pending').length;

    if (loading) {
        return (
            <div style={{ padding: '24px', textAlign: 'center', fontSize: '16px', color: '#6b7280' }}>
                Loading bookings...
            </div>
        );
    }

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '16px',
                marginBottom: '24px',
                flexWrap: 'wrap'
            }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Bookings</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Manage all apartment bookings</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ color: '#6b7280' }}>Active:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 600, color: '#111827' }}>{activeCount}</span>
                    </div>
                    <div style={{ fontSize: '14px' }}>
                        <span style={{ color: '#6b7280' }}>Pending:</span>
                        <span style={{ marginLeft: '4px', fontWeight: 600, color: '#ea580c' }}>{pendingCount}</span>
                    </div>
                </div>
            </div>

            {/* Booking Table */}
            <BookingTable
                bookings={bookings}
                onStatusChange={handleStatusChange}
            />
        </div>
    );
}
