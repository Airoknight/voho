import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <div style={{
            minHeight: '100vh',
            background: '#f8f9fa'
        }}>
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                width: '100%',
                paddingLeft: isMobile ? 0 : '280px',
                transition: 'padding-left 0.2s ease'
            }}>
                <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

                <main style={{
                    flex: 1,
                    padding: '0', // Removed padding to attach to sidebar
                    width: '100%',
                    background: '#ffffff' // Match sidebar or keep neutral
                }}>
                    <div style={{ width: '100%', height: '100%' }}>
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
