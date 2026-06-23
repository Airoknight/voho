import { useState, useEffect } from 'react';
import { TrendingUp, CreditCard, Calendar, Filter } from 'lucide-react';



export default function Payments() {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [showFilters, setShowFilters] = useState(false);

    const fetchTransactions = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/transactions');
            if (response.ok) {
                const data = await response.json();
                setTransactions(data);
            }
        } catch (e) {
            console.error('Failed to fetch transactions:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTransactions();
    }, []);

    const handleApprove = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/${id}/approve`, {
                method: 'PUT'
            });
            if (response.ok) {
                fetchTransactions();
            }
        } catch (e) {
            console.error('Failed to approve transaction:', e);
        }
    };

    const handleReject = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/transactions/${id}/reject`, {
                method: 'PUT'
            });
            if (response.ok) {
                fetchTransactions();
            }
        } catch (e) {
            console.error('Failed to reject transaction:', e);
        }
    };

    const filteredTransactions = transactions.filter(txn => {
        if (!dateFrom && !dateTo) return true;
        const txnDate = new Date(txn.date);
        const from = dateFrom ? new Date(dateFrom) : null;
        const to = dateTo ? new Date(dateTo) : null;

        if (from && txnDate < from) return false;
        if (to && txnDate > to) return false;
        return true;
    });

    const totalRevenue = filteredTransactions
        .filter(t => t.status === 'completed')
        .reduce((sum, t) => sum + t.amount, 0);

    const pendingAmount = filteredTransactions
        .filter(t => t.status === 'pending')
        .reduce((sum, t) => sum + t.amount, 0);

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '6px',
        border: '1px solid #e5e7eb',
        padding: '20px',
        flex: 1,
        minWidth: '200px'
    };

    const statIconStyle = {
        width: '40px',
        height: '40px',
        borderRadius: '6px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '12px'
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        fontSize: '14px',
        outline: 'none'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '4px'
    };

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Payments</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Track all payment transactions</p>
                </div>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={{
                        padding: '8px 16px',
                        border: '1px solid #d1d5db',
                        background: 'white',
                        borderRadius: '6px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        cursor: 'pointer',
                        fontSize: '14px'
                    }}
                >
                    <Filter size={16} />
                    Filters
                </button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ ...statIconStyle, background: '#dcfce7' }}>
                            <TrendingUp size={20} color="#16a34a" />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Total Received</p>
                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>₹{totalRevenue.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ ...statIconStyle, background: '#ffedd5' }}>
                            <CreditCard size={20} color="#ea580c" />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Pending</p>
                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>₹{pendingAmount.toLocaleString()}</p>
                        </div>
                    </div>
                </div>
                <div style={cardStyle}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ ...statIconStyle, background: '#dbeafe' }}>
                            <Calendar size={20} color="#2563eb" />
                        </div>
                        <div>
                            <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '2px' }}>Transactions</p>
                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#111827' }}>{filteredTransactions.length}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            {showFilters && (
                <div style={{ ...cardStyle, marginBottom: '24px', flex: 'none' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-end' }}>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={labelStyle}>From Date</label>
                            <input
                                type="date"
                                value={dateFrom}
                                onChange={(e) => setDateFrom(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div style={{ flex: 1, minWidth: '200px' }}>
                            <label style={labelStyle}>To Date</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                style={inputStyle}
                            />
                        </div>
                        <div>
                            <button
                                onClick={() => { setDateFrom(''); setDateTo(''); }}
                                style={{
                                    padding: '10px 16px',
                                    border: '1px solid #d1d5db',
                                    background: 'white',
                                    borderRadius: '6px',
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: '#374151'
                                }}
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Transactions Table */}
            <div style={{ background: '#ffffff', borderRadius: '6px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                        <thead>
                            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Transaction ID</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Booking</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Guest</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Apartment</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Amount</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Date</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Method</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Status</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Receipt</th>
                                <th style={{ padding: '14px 16px', textAlign: 'left', fontSize: '12px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((txn) => (
                                <tr key={txn.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 500, color: '#111827' }}>{txn.id}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#6b7280' }}>{txn.bookingId}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#111827' }}>{txn.guest}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#6b7280' }}>{txn.apartment}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', fontWeight: 600, color: '#111827' }}>₹{txn.amount.toLocaleString()}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#6b7280' }}>{txn.date}</td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px', color: '#6b7280' }}>{txn.method}</td>
                                    <td style={{ padding: '14px 16px' }}>
                                        <span style={{
                                            padding: '4px 10px',
                                            borderRadius: '4px',
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            background: txn.status === 'completed' ? '#dcfce7' : txn.status === 'rejected' ? '#fde8e8' : '#fef3c7',
                                            color: txn.status === 'completed' ? '#166534' : txn.status === 'rejected' ? '#9b1c1c' : '#92400e'
                                        }}>
                                            {txn.status}
                                        </span>
                                    </td>
                                    <td style={{ padding: '14px 16px', fontSize: '14px' }}>
                                        {txn.receiptUrl ? (
                                            <a href={txn.receiptUrl} target="_blank" rel="noreferrer" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: 600 }}>
                                                View Receipt
                                            </a>
                                        ) : (
                                            <span style={{ color: '#9ca3af' }}>No Receipt</span>
                                        )}
                                    </td>
                                    <td style={{ padding: '14px 16px' }}>
                                        {txn.status === 'pending' ? (
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleApprove(txn.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#16a34a',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    Approve
                                                </button>
                                                <button
                                                    onClick={() => handleReject(txn.id)}
                                                    style={{
                                                        padding: '6px 12px',
                                                        background: '#ef4444',
                                                        color: 'white',
                                                        border: 'none',
                                                        borderRadius: '4px',
                                                        cursor: 'pointer',
                                                        fontSize: '12px',
                                                        fontWeight: 600,
                                                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                                                    }}
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        ) : txn.status === 'completed' ? (
                                            <span style={{ color: '#16a34a', fontSize: '12px', fontWeight: 600 }}>Approved</span>
                                        ) : (
                                            <span style={{ color: '#ef4444', fontSize: '12px', fontWeight: 600 }}>Rejected</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredTransactions.length === 0 && (
                    <div style={{ padding: '32px', textAlign: 'center', color: '#6b7280' }}>
                        No transactions found for the selected date range.
                    </div>
                )}
            </div>
        </div>
    );
}
