import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, CheckCircle, LogIn, Phone, MessageCircle, Search } from 'lucide-react';

export default function BookingTable({ bookings, onStatusChange }) {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredBookings = bookings.filter(booking => {
        const matchesSearch = booking.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            booking.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusBadge = (status) => {
        const badges = {
            confirmed: 'badge badge-info',
            'checked-in': 'badge badge-active',
            'active': 'badge badge-active',
            completed: 'badge badge-success',
            cancelled: 'badge badge-error',
            rejected: 'badge badge-error',
            pending: 'badge badge-warning'
        };
        return badges[status] || 'badge badge-neutral';
    };

    const getPaymentBadge = (status) => {
        const badges = {
            paid: 'badge badge-success',
            pending: 'badge badge-warning',
            partial: 'badge badge-warning',
            failed: 'badge badge-error',
            unpaid: 'badge badge-error'
        };
        return badges[status] || 'badge badge-neutral';
    };

    const handleWhatsApp = (phone, name) => {
        const message = `Hello ${name}, this is VOHO Apartments. How can we assist you today?`;
        window.open(`https://wa.me/${phone.replace(/\s/g, '').replace('+', '')}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleCall = (phone) => {
        window.open(`tel:${phone.replace(/\s/g, '')}`, '_self');
    };

    // Hubspot-like "blended" styles
    // Removed cardStyle

    const filterBarStyle = {
        padding: '0 0 20px 0', // Removed top/side padding to blend
        background: 'transparent', // Transparent
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        marginBottom: '20px'
    };

    const inputStyle = {
        flex: 1,
        minWidth: '240px',
        padding: '10px 16px 10px 36px',
        border: '1px solid #d1d5db',
        borderRadius: '6px', // Sharp
        fontSize: '14px',
        fontFamily: 'inherit',
        background: '#ffffff',
        outline: 'none',
        height: '42px', // Explicit height for alignment
        transition: 'border-color 0.2s'
    };

    const selectStyle = {
        padding: '10px 32px 10px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px', // Sharp
        fontSize: '14px',
        fontFamily: 'inherit',
        background: '#ffffff',
        cursor: 'pointer',
        outline: 'none',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
        backgroundSize: '16px',
        height: '42px' // Match input height
    };

    const thStyle = {
        padding: '14px 16px', // More breathing room
        textAlign: 'left',
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        borderTop: '1px solid #e2e8f0',
        fontWeight: 600,
        fontSize: '12px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        color: '#64748b',
        whiteSpace: 'nowrap'
    };

    const tdStyle = {
        padding: '16px 16px', // Taller rows
        borderBottom: '1px solid #f1f5f9',
        fontSize: '14px',
        color: '#334155',
        background: 'transparent',
        verticalAlign: 'middle'
    };

    const getAvatarColor = (name) => {
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        let hash = 0;
        for (let i = 0; i < name.length; i++) {
            hash = name.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const Avatar = ({ name }) => (
        <div style={{
            width: '36px', // Slightly larger
            height: '36px',
            borderRadius: '6px',
            background: getAvatarColor(name) + '20',
            color: getAvatarColor(name),
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 600,
            fontSize: '13px',
            flexShrink: 0
        }}>
            {name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
    );

    const iconBtnStyle = {
        padding: '8px', // Larger hit area
        border: '1px solid #e5e7eb', // Subtle border
        background: '#ffffff',
        borderRadius: '6px', // Sharp
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.15s ease',
        color: '#6b7280'
    };

    // Mobile Card Styles
    const mobileCardStyle = {
        padding: '16px 0',
        borderBottom: '1px solid #e5e7eb'
    };

    return (
        <div style={{ background: 'transparent' }}>
            {/* Filters */}
            <div style={filterBarStyle}>
                <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                    <Search
                        size={16}
                        color="#9ca3af"
                        style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }}
                    />
                    <input
                        type="text"
                        placeholder="Search deals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    style={selectStyle}
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="checked-in">Checked In</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Desktop Table - Hidden on small screens via CSS in index.css */}
            <div className="lg:block hidden">
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Booking ID</th>
                            <th style={thStyle}>Guest</th>
                            <th style={thStyle}>Apartment</th>
                            <th style={thStyle}>Check-in</th>
                            <th style={thStyle}>Check-out</th>
                            <th style={thStyle}>Amount</th>
                            <th style={thStyle}>Payment</th>
                            <th style={thStyle}>Status</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBookings.map((booking, idx) => (
                            <tr
                                key={booking.id}
                                style={{
                                    background: idx % 2 === 0 ? '#ffffff' : '#fafafa'
                                }}
                            >
                                <td style={{ ...tdStyle, fontWeight: 600, color: '#1a1a1a' }}>
                                    {booking.id}
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Avatar name={booking.guestName} />
                                        <div>
                                            <p style={{ fontWeight: 600, color: '#111827', marginBottom: '1px' }}>
                                                {booking.guestName}
                                            </p>
                                            <p style={{ fontSize: '12px', color: '#6b7280' }}>{booking.phone}</p>
                                        </div>
                                    </div>
                                </td>
                                <td style={{ ...tdStyle, color: '#444444' }}>{booking.apartment}</td>
                                <td style={{ ...tdStyle, color: '#444444' }}>{booking.checkIn}</td>
                                <td style={{ ...tdStyle, color: '#444444' }}>{booking.checkOut}</td>
                                <td style={{ ...tdStyle, fontWeight: 600, color: '#1a1a1a' }}>
                                    ₹{booking.amount.toLocaleString()}
                                </td>
                                <td style={tdStyle}>
                                    <span className={getPaymentBadge(booking.paymentStatus)}>
                                        {booking.paymentStatus}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <span className={getStatusBadge(booking.status)}>
                                        {booking.status}
                                    </span>
                                </td>
                                <td style={tdStyle}>
                                    <div style={{ display: 'flex', gap: '4px' }}>
                                        <button
                                            onClick={() => navigate(`/bookings/${booking.id}`)}
                                            style={iconBtnStyle}
                                            title="View Details"
                                        >
                                            <Eye size={18} color="#666666" />
                                        </button>
                                        <button
                                            onClick={() => handleCall(booking.phone)}
                                            style={iconBtnStyle}
                                            title="Call Guest"
                                        >
                                            <Phone size={18} color="#2563eb" />
                                        </button>
                                        <button
                                            onClick={() => handleWhatsApp(booking.phone, booking.guestName)}
                                            style={iconBtnStyle}
                                            title="WhatsApp"
                                        >
                                            <MessageCircle size={18} color="#16a34a" />
                                        </button>
                                        {booking.status === 'confirmed' && (
                                            <button
                                                onClick={() => onStatusChange(booking.id, 'checked-in')}
                                                style={iconBtnStyle}
                                                title="Mark Check-in"
                                            >
                                                <LogIn size={18} color="#16a34a" />
                                            </button>
                                        )}
                                        {booking.status === 'checked-in' && (
                                            <button
                                                onClick={() => onStatusChange(booking.id, 'completed')}
                                                style={iconBtnStyle}
                                                title="Mark Check-out"
                                            >
                                                <CheckCircle size={18} color="#16a34a" />
                                            </button>
                                        )}
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Cards - Shown on small screens via CSS in index.css */}
            <div className="lg:hidden">
                {filteredBookings.map((booking) => (
                    <div key={booking.id} style={mobileCardStyle}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
                            <div>
                                <p style={{ fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                                    {booking.guestName}
                                </p>
                                <p style={{ fontSize: '13px', color: '#666666' }}>
                                    {booking.id} • {booking.apartment}
                                </p>
                            </div>
                            <span className={getStatusBadge(booking.status)}>{booking.status}</span>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '16px', fontSize: '14px' }}>
                            <div>
                                <span style={{ color: '#888888' }}>Check-in: </span>
                                <span style={{ color: '#1a1a1a' }}>{booking.checkIn}</span>
                            </div>
                            <div>
                                <span style={{ color: '#888888' }}>Check-out: </span>
                                <span style={{ color: '#1a1a1a' }}>{booking.checkOut}</span>
                            </div>
                            <div>
                                <span style={{ color: '#888888' }}>Amount: </span>
                                <span style={{ fontWeight: 600, color: '#1a1a1a' }}>₹{booking.amount.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className={getPaymentBadge(booking.paymentStatus)}>{booking.paymentStatus}</span>
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => navigate(`/bookings/${booking.id}`)}
                                style={{
                                    flex: 1,
                                    background: '#1F3D2A',
                                    color: 'white',
                                    padding: '8px',
                                    borderRadius: '8px',
                                    border: 'none',
                                    fontSize: '13px',
                                    fontWeight: 600,
                                    cursor: 'pointer'
                                }}
                            >
                                View Details
                            </button>
                            <button
                                onClick={() => handleCall(booking.phone)}
                                style={{
                                    padding: '8px',
                                    background: 'transparent',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    color: '#374151'
                                }}
                            >
                                <Phone size={16} />
                            </button>
                            <button
                                onClick={() => handleWhatsApp(booking.phone, booking.guestName)}
                                style={{
                                    padding: '8px',
                                    background: 'transparent',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    color: '#374151'
                                }}
                            >
                                <MessageCircle size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBookings.length === 0 && (
                <div style={{ padding: '48px 24px', textAlign: 'center', color: '#888888' }}>
                    No bookings found matching your criteria.
                </div>
            )}
        </div>
    );
}
