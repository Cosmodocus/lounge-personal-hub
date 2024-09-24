import { ReactNode } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface MainLayoutProps {
    children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className="flex h-screen">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Navbar />
                <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
