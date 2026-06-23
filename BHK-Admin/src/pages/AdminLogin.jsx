import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// Removed framer-motion to simplify debugging
import { Mail, Lock, Eye, EyeOff, Loader } from 'lucide-react';
import logo from '../assets/logo.png';

export default function AdminLogin() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please enter email and password');
            return;
        }

        setLoading(true);

        // Simulate login
        await new Promise(resolve => setTimeout(resolve, 800));

        const authorizedEmails = ['admin@voho.in', 'owner@voho.in', 'manager@voho.in'];

        if (authorizedEmails.includes(email) && password === 'admin123') {
            // Save current user to localStorage
            localStorage.setItem('currentUser', JSON.stringify({ email }));
            navigate('/dashboard');
        } else if (email && password && !authorizedEmails.includes(email)) {
            // Support any other email for demo if password is provided, but mark as guest
            localStorage.setItem('currentUser', JSON.stringify({ email }));
            navigate('/dashboard');
        } else {
            setError('Invalid credentials');
        }

        setLoading(false);
    };

    const handleDemoLogin = async () => {
        setEmail('admin@voho.in');
        setPassword('admin123');
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        localStorage.setItem('currentUser', JSON.stringify({ email: 'admin@voho.in' }));
        navigate('/dashboard');
        setLoading(false);
    };

    const containerStyle = {
        minHeight: '100vh',
        background: '#F5F5F7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        fontFamily: "'Plus Jakarta Sans', sans-serif"
    };

    const cardStyle = {
        background: '#ffffff',
        borderRadius: '24px',
        padding: '48px',
        width: '100%',
        maxWidth: '440px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    };

    const inputWrapperStyle = {
        position: 'relative',
        transition: 'all 0.2s ease'
    };

    const inputStyle = {
        width: '100%',
        padding: '16px 20px 16px 52px',
        border: '1px solid #E5E7EB',
        borderRadius: '12px',
        fontSize: '15px',
        fontFamily: 'inherit',
        background: '#FFFFFF',
        transition: 'all 0.2s ease',
        outline: 'none',
        color: '#111827'
    };

    const iconStyle = {
        position: 'absolute',
        left: '18px',
        top: '50%',
        transform: 'translateY(-50%)',
        color: '#9CA3AF'
    };

    return (
        <div style={containerStyle}>
            <div
                style={cardStyle}
            >
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <img
                        src={logo}
                        alt="VOHO"
                        style={{
                            height: '60px',
                            width: 'auto',
                            margin: '0 auto 24px',
                            display: 'block'
                        }}
                    />
                    <h1 style={{ fontSize: '24px', fontWeight: 600, color: '#111827', marginBottom: '8px' }}>
                        Welcome Back
                    </h1>
                    <p style={{ fontSize: '15px', color: '#6B7280' }}>
                        Sign in to manage your property
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin}>
                    {/* Email */}
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            fontSize: '14px',
                            fontWeight: 500,
                            color: '#374151',
                            marginBottom: '8px'
                        }}>
                            Email Address
                        </label>
                        <div style={inputWrapperStyle}>
                            <Mail style={iconStyle} size={20} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@voho.in"
                                style={inputStyle}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#1F3D2A';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(31, 61, 42, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                        </div>
                    </div>

                    {/* Password */}
                    <div style={{ marginBottom: '32px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <label style={{
                                fontSize: '14px',
                                fontWeight: 500,
                                color: '#374151',
                            }}>
                                Password
                            </label>
                            <a href="#" style={{ fontSize: '13px', color: '#1F3D2A', textDecoration: 'none', fontWeight: 500 }}>
                                Forgot Password?
                            </a>
                        </div>
                        <div style={inputWrapperStyle}>
                            <Lock style={iconStyle} size={20} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                style={{ ...inputStyle, paddingRight: '52px' }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = '#1F3D2A';
                                    e.target.style.boxShadow = '0 0 0 4px rgba(31, 61, 42, 0.1)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = '#E5E7EB';
                                    e.target.style.boxShadow = 'none';
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '4px',
                                    color: '#9CA3AF'
                                }}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div style={{
                            background: '#FEE2E2',
                            borderRadius: '8px',
                            padding: '12px',
                            marginBottom: '24px',
                            fontSize: '14px',
                            color: '#991B1B',
                            textAlign: 'center',
                            fontWeight: 500
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            width: '100%',
                            padding: '14px',
                            background: loading
                                ? '#9CA3AF'
                                : '#1F3D2A',
                            border: 'none',
                            borderRadius: '12px',
                            color: '#ffffff',
                            fontSize: '15px',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 4px 6px -1px rgba(31, 61, 42, 0.3)'
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.transform = 'translateY(-1px)')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.transform = 'none')}
                    >
                        {loading ? (
                            <>
                                <Loader size={18} className="animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            'Sign In'
                        )}
                    </button>

                    <button
                        type="button"
                        onClick={handleDemoLogin}
                        disabled={loading}
                        style={{
                            width: '100%',
                            marginTop: '12px',
                            padding: '14px',
                            background: 'transparent',
                            border: '1px solid #1F3D2A',
                            borderRadius: '12px',
                            color: '#1F3D2A',
                            fontSize: '15px',
                            fontWeight: 600,
                            cursor: loading ? 'not-allowed' : 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={(e) => !loading && (e.currentTarget.style.background = 'rgba(31, 61, 42, 0.05)')}
                        onMouseLeave={(e) => !loading && (e.currentTarget.style.background = 'transparent')}
                    >
                        Demo Login
                    </button>

                    {/* Demo credentials */}
                    <div style={{
                        marginTop: '32px',
                        textAlign: 'center',
                        fontSize: '13px',
                        color: '#9CA3AF'
                    }}>
                        <p style={{ marginBottom: '4px' }}>Demo Credentials</p>
                        <code style={{
                            background: '#F3F4F6',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            color: '#4B5563',
                            fontFamily: 'monospace'
                        }}>admin@voho.in</code>
                    </div>
                </form>
            </div>
        </div>
    );
}
