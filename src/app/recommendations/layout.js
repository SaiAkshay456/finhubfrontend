// app/recommendations/layout.js
import Sidebar from '../../components/Sidebar';
import { sidebarItems } from '../../constants/sidebarRoutes';

export const metadata = {
    title: "Recommendations",
    description: "Personalized mutual fund or stock recommendations",
};

export default function Layout({ children }) {
    return (
        <main className="min-h-screen m-3">
        {children}
    </main>
    );
}
