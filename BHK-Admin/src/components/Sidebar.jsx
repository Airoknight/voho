import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    CalendarDays,
    Building2,
    CreditCard,
    Settings,
    LogOut,
    BookOpen,
    X
} from 'lucide-react';
import logo from '../assets/logo.png';

const navItems = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/bookings', label: 'Bookings', icon: BookOpen },
    { path: '/calendar', label: 'Calendar', icon: CalendarDays },
    { path: '/apartments', label: 'Apartments', icon: Building2 },
    { path: '/payments', label: 'Payments', icon: CreditCard },
    { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, onClose }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const desktopStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: '280px',
        background: '#0F2822',
        color: '#ffffff',
        flexDirection: 'column',
        zIndex: 50,
        borderRight: 'none',
        boxShadow: 'none'
    };

    const mobileStyle = {
        position: 'fixed',
        top: '72px',
        left: 0,
        bottom: 0,
        width: '280px',
        background: '#0F2822',
        color: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        borderRight: 'none',
        boxShadow: '4px 0 24px rgba(0,0,0,0.3)',
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
    };

    const linkBaseStyle = {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '12px 16px',
        borderRadius: '6px',
        fontSize: '14px',
        textDecoration: 'none',
        margin: '2px 8px',
        transition: 'all 0.15s ease-in-out',
        border: '1px solid transparent'
    };

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    onClick={onClose}
                    style={{
                        position: 'fixed',
                        inset: 0,
                        background: 'rgba(0,0,0,0.6)',
                        backdropFilter: 'blur(4px)',
                        zIndex: 40
                    }}
                    className="lg:hidden"
                />
            )}

            {/* Desktop sidebar */}
            <aside style={desktopStyle} className="hidden lg:flex">
                <SidebarContent
                    navItems={navItems}
                    linkBaseStyle={linkBaseStyle}
                    onClose={onClose}
                    handleLogout={handleLogout}
                />
            </aside>

            {/* Mobile sidebar */}
            <aside style={mobileStyle} className="lg:hidden">
                <SidebarContent
                    navItems={navItems}
                    linkBaseStyle={linkBaseStyle}
                    onClose={onClose}
                    handleLogout={handleLogout}
                    showClose
                />
            </aside>
        </>
    );
}

function SidebarContent({ navItems, linkBaseStyle, onClose, handleLogout, showClose }) {
    return (
        <>
            <div style={{
                height: '80px',
                padding: '0 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.08)'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                        src={logo}
                        alt="Voho Logo"
                        style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.5)' }}
                    />
                </div>
                {showClose && (
                    <button
                        onClick={onClose}
                        style={{
                            padding: '8px',
                            background: 'rgba(255,255,255,0.1)',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            display: 'flex',
                            color: '#ffffff'
                        }}
                    >
                        <X size={18} />
                    </button>
                )}
            </div>

            <nav style={{ flex: 1, padding: '20px 16px', overflowY: 'auto' }}>
                <div style={{
                    fontSize: '10px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: '12px',
                    paddingLeft: '20px'
                }}>
                    Main Menu
                </div>
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        onClick={onClose}
                        style={({ isActive }) => ({
                            ...linkBaseStyle,
                            fontWeight: isActive ? 600 : 500,
                            background: isActive ? 'rgba(212,175,55,0.15)' : 'transparent',
                            color: isActive ? '#D4AF37' : 'rgba(255,255,255,0.55)',
                            borderColor: isActive ? 'rgba(212,175,55,0.25)' : 'transparent'
                        })}
                    >
                        <item.icon size={20} style={{ opacity: 1 }} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 20px',
                        width: '100%',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontWeight: 500,
                        background: 'transparent',
                        border: '1px solid rgba(255,255,255,0.15)',
                        color: 'rgba(255,255,255,0.6)',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                    }}
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </>
    );
}
