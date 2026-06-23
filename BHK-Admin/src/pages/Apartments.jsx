import { useState } from 'react';
import { Edit2, Save, X, ToggleLeft, ToggleRight, Check } from 'lucide-react';

const initialApartments = [
    {
        id: 1,
        name: 'Flat 1',
        price: 3500,
        amenities: ['City View', 'Balcony', 'Premium Finishings', 'King Bed', 'Smart TV', 'AC'],
        available: true,
        color: '#D4AF37'
    },
    {
        id: 2,
        name: 'Flat 2',
        price: 3200,
        amenities: ['Smart Lighting', 'Open Kitchen', 'Parking', 'Queen Bed', 'WiFi', 'AC'],
        available: true,
        color: '#22c55e'
    },
    {
        id: 3,
        name: 'Flat 3',
        price: 8000,
        amenities: ['Modern Interior', 'Garden View', 'Quiet Area', 'King Bed', 'Smart TV', 'AC'],
        available: true,
        color: '#3b82f6'
    },
    {
        id: 4,
        name: 'Flat 4',
        price: 8000,
        amenities: ['Premium Suite', 'City View', 'Luxury Bath', 'King Bed', 'Smart TV', 'AC'],
        available: true,
        color: '#a855f7'
    },
    {
        id: 5,
        name: 'Suite Room',
        price: 8000,
        amenities: ['Dedicated Workspace', 'Meeting Area', 'Premium WiFi', 'Mini Bar', 'City View', 'AC'],
        available: true,
        color: '#f97316'
    },
    {
        id: 6,
        name: 'Deck Room',
        price: 3000,
        amenities: ['Outdoor Deck', 'Sunset View', 'Queen Bed', 'WiFi', 'AC'],
        available: true,
        color: '#ec4899'
    },
    {
        id: 7,
        name: 'Open Area',
        price: 10000,
        amenities: ['Large Space', 'Event Friendly', 'WiFi', 'Projector Ready'],
        available: true,
        color: '#6366f1'
    },
];

export default function Apartments() {
    const [apartments, setApartments] = useState(initialApartments);
    const [editingId, setEditingId] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);

    const startEdit = (apartment) => {
        setEditingId(apartment.id);
        setEditForm({
            name: apartment.name,
            price: apartment.price,
            amenities: apartment.amenities.join(', ')
        });
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditForm({});
    };

    const saveEdit = (id) => {
        setApartments(prev => prev.map(apt =>
            apt.id === id
                ? {
                    ...apt,
                    name: editForm.name,
                    price: parseInt(editForm.price),
                    amenities: editForm.amenities.split(',').map(a => a.trim()).filter(a => a)
                }
                : apt
        ));
        setEditingId(null);
        setEditForm({});
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
    };

    const toggleAvailability = (id) => {
        setApartments(prev => prev.map(apt =>
            apt.id === id ? { ...apt, available: !apt.available } : apt
        ));
    };

    const inputStyle = {
        width: '100%',
        padding: '10px 12px',
        border: '1px solid #d1d5db',
        borderRadius: '6px', // Sharp
        fontSize: '14px',
        outline: 'none',
        marginBottom: '10px'
    };

    const labelStyle = {
        display: 'block',
        fontSize: '13px',
        fontWeight: 500,
        color: '#4b5563',
        marginBottom: '4px'
    };

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1600px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Apartments</h1>
                    <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Manage your apartment listings</p>
                </div>
                {showSuccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px', color: '#16a34a', background: '#dcfce7', padding: '6px 12px', borderRadius: '6px' }}>
                        <Check size={14} />
                        Saved
                    </div>
                )}
            </div>

            {/* Apartments Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '16px' }}>
                {apartments.map((apartment) => (
                    <div
                        key={apartment.id}
                        style={{
                            background: '#ffffff',
                            borderRadius: '6px', // Sharp
                            border: '1px solid #e5e7eb',
                            overflow: 'hidden',
                            opacity: !apartment.available ? 0.8 : 1
                        }}
                    >
                        {/* Color Header */}
                        <div style={{ height: '6px', backgroundColor: apartment.color }} />

                        <div style={{ padding: '20px' }}>
                            {editingId === apartment.id ? (
                                /* Edit Mode */
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div>
                                        <label style={labelStyle}>Apartment Name</label>
                                        <input
                                            type="text"
                                            value={editForm.name}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Price per Night (Rs.)</label>
                                        <input
                                            type="number"
                                            value={editForm.price}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, price: e.target.value }))}
                                            style={inputStyle}
                                        />
                                    </div>
                                    <div>
                                        <label style={labelStyle}>Amenities (comma-separated)</label>
                                        <input
                                            type="text"
                                            value={editForm.amenities}
                                            onChange={(e) => setEditForm(prev => ({ ...prev, amenities: e.target.value }))}
                                            style={inputStyle}
                                            placeholder="WiFi, AC, TV, ..."
                                        />
                                    </div>
                                    <div style={{ display: 'flex', gap: '8px', paddingTop: '8px' }}>
                                        <button
                                            onClick={() => saveEdit(apartment.id)}
                                            style={{
                                                background: '#1F3D2A',
                                                color: 'white',
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                border: 'none',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <Save size={14} />
                                            Save
                                        </button>
                                        <button
                                            onClick={cancelEdit}
                                            style={{
                                                background: 'transparent',
                                                color: '#374151',
                                                border: '1px solid #d1d5db',
                                                padding: '8px 16px',
                                                borderRadius: '6px',
                                                fontSize: '13px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px'
                                            }}
                                        >
                                            <X size={14} />
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                /* View Mode */
                                <>
                                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                                        <div>
                                            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#111827', marginBottom: '4px' }}>{apartment.name}</h3>
                                            <p style={{ fontSize: '20px', fontWeight: 700, color: '#1F3D2A' }}>
                                                Rs. {apartment.price.toLocaleString()}
                                                <span style={{ fontSize: '13px', fontWeight: 400, color: '#6b7280', marginLeft: '4px' }}>/night</span>
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => startEdit(apartment)}
                                            style={{
                                                padding: '8px',
                                                background: 'transparent',
                                                border: 'none',
                                                cursor: 'pointer',
                                                color: '#6b7280'
                                            }}
                                            title="Edit Apartment"
                                        >
                                            <Edit2 size={18} />
                                        </button>
                                    </div>

                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                                        {apartment.amenities.map((amenity, idx) => (
                                            <span key={idx} style={{
                                                fontSize: '12px',
                                                background: '#f3f4f6',
                                                color: '#4b5563',
                                                padding: '4px 8px',
                                                borderRadius: '4px'
                                            }}>
                                                {amenity}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                                        <span style={{ fontSize: '14px', fontWeight: 500, color: apartment.available ? '#16a34a' : '#dc2626' }}>
                                            {apartment.available ? 'Available' : 'Temporarily Unavailable'}
                                        </span>
                                        <button
                                            onClick={() => toggleAvailability(apartment.id)}
                                            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                                        >
                                            {apartment.available ? (
                                                <ToggleRight size={32} color="#22c55e" />
                                            ) : (
                                                <ToggleLeft size={32} color="#9ca3af" />
                                            )}
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
