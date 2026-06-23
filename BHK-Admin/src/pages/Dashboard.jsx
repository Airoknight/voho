import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CalendarCheck, CalendarX, CreditCard, Users, Clock, Building2, Eye, X } from 'lucide-react';
import StatCard from '../components/StatCard';

export default function Dashboard() {
    const navigate = useNavigate();
    const [bookings, setBookings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeReceipt, setActiveReceipt] = useState(null);

    const fetchData = async () => {
        try {
            const [bookingsRes, txnsRes] = await Promise.all([
                fetch('http://localhost:5000/api/bookings'),
                fetch('http://localhost:5000/api/transactions')
            ]);
            if (bookingsRes.ok && txnsRes.ok) {
                const bookingsData = await bookingsRes.json();
                const txnsData = await txnsRes.json();
                setBookings(bookingsData);
                setTransactions(txnsData);
            }
        } catch (e) {
            console.error('Failed to fetch dashboard data:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleApprove = async (txnId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/${txnId}/approve`, {
                method: 'PUT'
            });
            if (response.ok) {
                await fetchData();
            }
        } catch (e) {
            console.error('Failed to approve transaction:', e);
        }
    };

    const handleReject = async (txnId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/${txnId}/reject`, {
                method: 'PUT'
            });
            if (response.ok) {
                await fetchData();
            }
        } catch (e) {
            console.error('Failed to reject transaction:', e);
        }
    };

    const activeBookings = bookings.filter(b => b.status === 'confirmed' || b.status === 'checked-in');
    
    // Check-ins / Check-outs today (excluding pending/rejected)
    const todayStr = new Date().toISOString().split('T')[0];
    const todayCheckIns = bookings.filter(b => b.checkIn === todayStr && (b.status === 'confirmed' || b.status === 'checked-in'));
    const todayCheckOuts = bookings.filter(b => b.checkOut === todayStr && (b.status === 'checked-in' || b.status === 'completed'));

    // Monthly revenue
    const totalRevenue = transactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const pendingVerifications = transactions
        .filter(t => t.status === 'pending')
        .map(t => {
            const booking = bookings.find(b => b.id === t.bookingId);
            return {
                ...t,
                bookingDetails: booking
            };
        });

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '8px', // Sharper
        border: '1px solid #e5e7eb',
        overflow: 'hidden'
    };

    const cardHeaderStyle = {
        padding: '16px 20px',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#ffffff' // Cleaner white header
    };

    const activityItemStyle = {
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    };

    const getAvatarColor = (name) => {
        const safeName = name || "Guest";
        const colors = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];
        let hash = 0;
        for (let i = 0; i < safeName.length; i++) {
            hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
        }
        return colors[Math.abs(hash) % colors.length];
    };

    const Avatar = ({ name }) => {
        const safeName = name || "Guest";
        return (
            <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '6px', // Sharp
                background: getAvatarColor(safeName) + '20', // 20% opacity
                color: getAvatarColor(safeName),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 600,
                fontSize: '12px'
            }}>
                {safeName.split(' ').map(n => n[0]).join('').slice(0, 2)}
            </div>
        );
    };

    if (loading) {
        return (
            <div style={{ padding: '24px', textAlign: 'center', fontSize: '16px', color: '#6b7280' }}>
                Loading dashboard overview...
            </div>
        );
    }

    return (
        <div className="page-container" style={{ padding: '16px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>
                    Dashboard
                </h1>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                    Welcome back! Here is your property overview.
                </p>
            </div>

            {/* Stats Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                <StatCard
                    title="Active Bookings"
                    value={activeBookings.length.toString()}
                    icon={Users}
                    trend="8%"
                    trendUp={true}
                    linkTo="/bookings"
                />
                <StatCard
                    title="Check-ins Today"
                    value={todayCheckIns.length.toString()}
                    icon={CalendarCheck}
                    linkTo="/bookings"
                />
                <StatCard
                    title="Check-outs Today"
                    value={todayCheckOuts.length.toString()}
                    icon={CalendarX}
                    linkTo="/bookings"
                />
                <StatCard
                    title="Monthly Revenue"
                    value={`₹${totalRevenue.toLocaleString()}`}
                    icon={CreditCard}
                    trend="12%"
                    trendUp={true}
                    linkTo="/payments"
                />
            </div>

            {/* Pending Payment Verifications */}
            {pendingVerifications.length > 0 && (
                <div style={{ ...cardStyle, marginBottom: '24px' }}>
                    <div style={{
                        ...cardHeaderStyle,
                        background: '#fffbeb',
                        borderBottom: '1px solid #fef3c7'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#92400e' }}>
                                Pending Payment Verifications
                            </h3>
                            <span style={{
                                padding: '4px 10px',
                                borderRadius: '999px',
                                background: '#fef3c7',
                                color: '#92400e',
                                fontSize: '11px',
                                fontWeight: 700
                            }}>
                                {pendingVerifications.length} Action Required
                            </span>
                        </div>
                    </div>
                    
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                            <thead>
                                <tr style={{ background: '#fcf8f2', borderBottom: '1px solid #fef3c7' }}>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Booking ID</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Guest Details</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Apartment</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Dates</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Amount</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Proof</th>
                                    <th style={{ padding: '12px 16px', textAlign: 'center', fontSize: '11px', fontWeight: 600, color: '#b45309', textTransform: 'uppercase', borderBottom: '1px solid #fef3c7' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pendingVerifications.map((item, idx) => (
                                    <tr key={item.id} style={{ borderBottom: '1px solid #fef3c7', background: idx % 2 === 0 ? '#ffffff' : '#fffdfa' }}>
                                        <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                                            {item.bookingId}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <Avatar name={item.guest} />
                                                <div>
                                                    <p style={{ fontWeight: 600, color: '#111827', fontSize: '13px' }}>{item.guest}</p>
                                                    <p style={{ fontSize: '11px', color: '#6b7280' }}>
                                                        {item.bookingDetails?.email || 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#374151' }}>
                                            {item.apartment}
                                        </td>
                                        <td style={{ padding: '14px 16px', fontSize: '13px', color: '#374151' }}>
                                            {item.bookingDetails ? (
                                                <span style={{ fontSize: '12px' }}>
                                                    {item.bookingDetails.checkIn} to {item.bookingDetails.checkOut}
                                                </span>
                                            ) : (
                                                <span style={{ color: '#9ca3af', fontSize: '12px' }}>N/A</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600, color: '#111827' }}>
                                            ₹{item.amount.toLocaleString()}
                                        </td>
                                        <td style={{ padding: '14px 16px' }}>
                                            {item.receiptUrl ? (
                                                <button
                                                    onClick={() => setActiveReceipt(item)}
                                                    style={{
                                                        padding: '6px 10px',
                                                        background: '#eff6ff',
                                                        color: '#1d4ed8',
                                                        border: '1px solid #bfdbfe',
                                                        borderRadius: '4px',
                                                        fontSize: '11px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer',
                                                        display: 'inline-flex',
                                                        alignItems: 'center',
                                                        gap: '4px'
                                                    }}
                                                >
                                                    <Eye size={12} />
                                                    View Receipt
                                                </button>
                                            ) : (
                                                <span style={{ color: '#9ca3af', fontSize: '12px' }}>No upload</span>
                                            )}
                                        </td>
                                        <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                                                <button
                                                    onClick={() => handleApprove(item.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#10b981',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(item.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 600
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Today's Activity */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px', marginBottom: '24px' }}>
                {/* Check-ins Today */}
                <div style={cardStyle}>
                    <div style={cardHeaderStyle}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                            Today's Check-ins
                        </h3>
                        <span className="badge badge-success">{todayCheckIns.length}</span>
                    </div>
                    <div>
                        {todayCheckIns.map((item, idx) => (
                            <div
                                key={item.id}
                                style={{
                                    ...activityItemStyle
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar name={item.guestName || item.guest || "Guest"} />
                                    <div>
                                        <p style={{ fontWeight: 600, color: '#111827', fontSize: '14px', marginBottom: '2px' }}>
                                            {item.guestName || item.guest || "Guest"}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {item.apartment}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Clock size={14} color="#9ca3af" />
                                        {item.time}
                                    </p>
                                    <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                                        {item.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Check-outs Today */}
                <div style={cardStyle}>
                    <div style={cardHeaderStyle}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                            Today's Check-outs
                        </h3>
                        <span className="badge badge-warning">{todayCheckOuts.length}</span>
                    </div>
                    <div>
                        {todayCheckOuts.map((item, idx) => (
                            <div
                                key={item.id}
                                style={{
                                    ...activityItemStyle
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                    <Avatar name={item.guestName || item.guest || "Guest"} />
                                    <div>
                                        <p style={{ fontWeight: 600, color: '#111827', fontSize: '14px', marginBottom: '2px' }}>
                                            {item.guestName || item.guest || "Guest"}
                                        </p>
                                        <p style={{ fontSize: '12px', color: '#6b7280' }}>
                                            {item.apartment}
                                        </p>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <p style={{
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        color: '#374151',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        justifyContent: 'flex-end'
                                    }}>
                                        <Clock size={14} color="#9ca3af" />
                                        {item.time}
                                    </p>
                                    <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                                        {item.phone}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div style={{ ...cardStyle }}>
                <div style={cardHeaderStyle}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#111827' }}>
                        Quick Actions
                    </h3>
                </div>
                <div style={{ padding: '16px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    <button
                        onClick={() => navigate('/bookings')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#111827',
                            color: '#ffffff',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <Users size={16} />
                        View Bookings
                    </button>
                    <button
                        onClick={() => navigate('/calendar')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#ffffff',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <CalendarCheck size={16} />
                        Check Calendar
                    </button>
                    <button
                        onClick={() => navigate('/apartments')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#ffffff',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <Building2 size={16} />
                        Manage Apartments
                    </button>
                    <button
                        onClick={() => navigate('/payments')}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 16px',
                            background: '#ffffff',
                            color: '#374151',
                            border: '1px solid #d1d5db',
                            borderRadius: '6px',
                            fontSize: '13px',
                            fontWeight: 600,
                            cursor: 'pointer'
                        }}
                    >
                        <CreditCard size={16} />
                        View Payments
                    </button>
                </div>
            </div>

            {/* Receipt Modal Overlay */}
            {activeReceipt && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.65)',
                    backdropFilter: 'blur(8px)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999,
                    padding: '20px'
                }} onClick={() => setActiveReceipt(null)}>
                    <div style={{
                        backgroundColor: '#ffffff',
                        borderRadius: '12px',
                        width: '100%',
                        maxWidth: '550px',
                        maxHeight: '90vh',
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden',
                        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                        border: '1px solid rgba(229, 231, 235, 0.5)'
                    }} onClick={(e) => e.stopPropagation()}>
                        {/* Modal Header */}
                        <div style={{
                            padding: '16px 20px',
                            borderBottom: '1px solid #e5e7eb',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                            <div>
                                <h3 style={{ fontSize: '16px', fontWeight: 700, color: '#111827' }}>
                                    Verify Payment Receipt
                                </h3>
                                <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '2px' }}>
                                    Transaction ID: {activeReceipt.id} ({activeReceipt.bookingId})
                                </p>
                            </div>
                            <button
                                onClick={() => setActiveReceipt(null)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    color: '#9ca3af',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: '4px'
                                }}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div style={{
                            padding: '20px',
                            overflowY: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '16px',
                            flex: 1
                        }}>
                            {/* Guest Details Summary */}
                            <div style={{
                                width: '100%',
                                backgroundColor: '#f9fafb',
                                border: '1px solid #e5e7eb',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                fontSize: '13px'
                            }}>
                                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Guest Name:</span>
                                    <strong style={{ color: '#111827' }}>{activeReceipt.guest}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Apartment:</span>
                                    <strong style={{ color: '#111827' }}>{activeReceipt.apartment}</strong>
                                </div>
                                <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ color: '#6b7280' }}>Total Amount:</span>
                                    <strong style={{ color: '#111827' }}>₹{activeReceipt.amount.toLocaleString()}</strong>
                                </div>
                                {activeReceipt.bookingDetails && (
                                    <>
                                        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                                            <span style={{ color: '#6b7280' }}>Check-in:</span>
                                            <strong style={{ color: '#111827' }}>{activeReceipt.bookingDetails.checkIn}</strong>
                                        </div>
                                        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ color: '#6b7280' }}>Check-out:</span>
                                            <strong style={{ color: '#111827' }}>{activeReceipt.bookingDetails.checkOut}</strong>
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Image Container */}
                            <div style={{
                                width: '100%',
                                backgroundColor: '#f3f4f6',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                border: '1px solid #e5e7eb',
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                maxHeight: '350px'
                            }}>
                                <img
                                    src={activeReceipt.receiptUrl}
                                    alt="Payment Receipt Screenshot"
                                    style={{
                                        maxWidth: '100%',
                                        maxHeight: '350px',
                                        objectFit: 'contain'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Modal Actions */}
                        <div style={{
                            padding: '16px 20px',
                            borderTop: '1px solid #e5e7eb',
                            display: 'flex',
                            justifyContent: 'flex-end',
                            gap: '12px',
                            backgroundColor: '#f9fafb'
                        }}>
                            <button
                                onClick={() => {
                                    handleReject(activeReceipt.id);
                                    setActiveReceipt(null);
                                }}
                                style={{
                                    padding: '10px 18px',
                                    background: '#ef4444',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                Reject Payment
                            </button>
                            <button
                                onClick={() => {
                                    handleApprove(activeReceipt.id);
                                    setActiveReceipt(null);
                                }}
                                style={{
                                    padding: '10px 18px',
                                    background: '#10b981',
                                    color: '#ffffff',
                                    border: 'none',
                                    borderRadius: '6px',
                                    fontWeight: 600,
                                    fontSize: '13px',
                                    cursor: 'pointer',
                                    transition: 'background 0.2s'
                                }}
                            >
                                Approve Payment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
