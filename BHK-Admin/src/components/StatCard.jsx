import { useNavigate } from 'react-router-dom';

export default function StatCard({ title, value, icon: Icon, trend, trendUp, linkTo, color = 'blue' }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (linkTo) {
            navigate(linkTo);
        }
    };

    // Unified sharp, white style
    const theme = { bg: '#ffffff', iconBg: '#000000', text: '#374151' };

    return (
        <div
            onClick={handleClick}
            style={{
                background: theme.bg,
                borderRadius: '6px', // Sharp edges
                border: '1px solid #e5e7eb', // Simple grey border
                padding: '24px',
                cursor: linkTo ? 'pointer' : 'default',
                transition: 'all 0.15s ease',
                display: 'flex',
                alignItems: 'center', // Horizontal alignment for classic look
                justifyContent: 'space-between',
                gap: '16px',
            }}
            className={linkTo ? 'stat-card-clickable' : ''}
        >
            <div>
                <p style={{
                    fontSize: '13px',
                    color: '#6b7280',
                    fontWeight: 600,
                    marginBottom: '4px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    {title}
                </p>
                <p style={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#111827',
                    lineHeight: 1.2
                }}>
                    {value}
                </p>
                {trend && (
                    <p style={{
                        fontSize: '13px',
                        marginTop: '6px',
                        fontWeight: 600,
                        color: trendUp ? '#16a34a' : '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span>{trendUp ? '↑' : '↓'}</span>
                        {trend}
                    </p>
                )}
            </div>

            <div style={{
                width: '48px',
                height: '48px',
                borderRadius: '6px', // Sharp
                background: '#f3f4f6', // Neutral greyish bg
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#111827' // Black icon
            }}>
                <Icon size={24} />
            </div>
        </div>
    );
}
