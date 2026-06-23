import { useState } from 'react';
import { Save, Building2, Phone, Mail, MapPin, Check } from 'lucide-react';
// Removed framer-motion

export default function Settings() {
    const [settings, setSettings] = useState({
        propertyName: 'VOHO Premium Apartments',
        contactPhone: '+91 98765 43210',
        email: 'bookings@voho.in',
        address: 'SRKR Marg, Bhimavaram, Andhra Pradesh',
        checkInTime: '14:00',
        checkOutTime: '11:00'
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    const inputStyle = {
        width: '100%',
        padding: '12px 16px',
        border: '1px solid #d1d5db',
        borderRadius: '6px', // Sharp
        fontSize: '14px',
        outline: 'none',
        marginTop: '6px',
        transition: 'border-color 0.2s',
        color: '#1f2937'
    };

    const labelStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '13px',
        fontWeight: 600,
        color: '#374151',
        marginBottom: '2px'
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '8px', // Sharp
        border: '1px solid #e5e7eb',
        padding: '24px'
    };

    return (
        <div className="page-container" style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Header */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#111827' }}>Settings</h1>
                <p style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>Manage your property settings</p>
            </div>

            {/* Success Message */}
            {saved && (
                <div style={{
                    marginBottom: '20px',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    background: '#ecfdf5',
                    border: '1px solid #a7f3d0',
                    color: '#047857',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: 500,
                    animation: 'fadeIn 0.3s ease-in'
                }}>
                    <Check size={16} />
                    Settings saved successfully!
                </div>
            )}

            {/* Settings Form Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                {/* Property Info */}
                <div style={cardStyle}>
                    <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>Property Information</h3>
                    <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={labelStyle}>
                                <Building2 size={14} />
                                Property Name
                            </label>
                            <input
                                type="text"
                                name="propertyName"
                                value={settings.propertyName}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                <Phone size={14} />
                                Contact Phone
                            </label>
                            <input
                                type="tel"
                                name="contactPhone"
                                value={settings.contactPhone}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                <Mail size={14} />
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={settings.email}
                                onChange={handleChange}
                                style={inputStyle}
                            />
                        </div>

                        <div>
                            <label style={labelStyle}>
                                <MapPin size={14} />
                                Address
                            </label>
                            <textarea
                                name="address"
                                value={settings.address}
                                onChange={handleChange}
                                rows={3}
                                style={{ ...inputStyle, resize: 'none' }}
                            />
                        </div>

                        <button
                            type="submit"
                            style={{
                                width: '100%',
                                background: '#111827', // Dark/Sharp
                                color: 'white',
                                padding: '12px',
                                borderRadius: '6px',
                                border: 'none',
                                fontWeight: 600,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                marginTop: '12px',
                                transition: 'background 0.2s'
                            }}
                        >
                            <Save size={16} />
                            Save Changes
                        </button>
                    </form>
                </div>

                {/* Timing Settings & About */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div style={cardStyle}>
                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#111827', marginBottom: '20px' }}>Check-in/Check-out Times</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={labelStyle}>Default Check-in Time</label>
                                <input
                                    type="time"
                                    name="checkInTime"
                                    value={settings.checkInTime}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>

                            <div>
                                <label style={labelStyle}>Default Check-out Time</label>
                                <input
                                    type="time"
                                    name="checkOutTime"
                                    value={settings.checkOutTime}
                                    onChange={handleChange}
                                    style={inputStyle}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
