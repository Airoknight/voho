import { Bell, Menu, User } from 'lucide-react';

export default function Topbar({ onMenuClick }) {
    const today = new Date().toLocaleDateString('en-IN', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header style={{
            height: '72px',
            background: '#ffffff',
            borderBottom: '1px solid #e5e7eb',
            padding: '0 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'sticky',
            top: 0,
            zIndex: 60
        }}>
            {/* Left side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <button
                    onClick={onMenuClick}
                    className="lg:hidden"
                    style={{
                        padding: '10px',
                        background: '#f5f5f5',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        marginRight: '8px'
                    }}
                >
                    <Menu size={20} color="#333" />
                </button>
                <div>
                    <p style={{ fontSize: '14px', color: '#6b7280', fontWeight: 500 }}>
                        {today}
                    </p>
                </div>
            </div>

            {/* Right side */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Notifications */}
                <button style={{
                    position: 'relative',
                    padding: '10px',
                    background: '#f5f5f5',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex'
                }}>
                    <Bell size={20} color="#333" />
                    <span style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '8px',
                        height: '8px',
                        background: '#dc2626',
                        borderRadius: '50%'
                    }} />
                </button>

                {/* Divider */}
                <div style={{
                    width: '1px',
                    height: '32px',
                    background: '#e5e7eb',
                    margin: '0 8px'
                }} />

                {/* Admin profile */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                }}>
                    <div style={{
                        width: '40px',
                        height: '40px',
                        background: '#0F2822',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <User size={20} color="#D4AF37" />
                    </div>
                    <div className="hidden sm:block">
                        <p style={{ fontSize: '14px', fontWeight: 600, color: '#111827' }}>
                            Admin
                        </p>
                        <p style={{ fontSize: '12px', color: '#6b7280' }}>
                            VOHO Manager
                        </p>
                    </div>
                </div>
            </div>
        </header>
    );
}
