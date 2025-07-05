'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ClientLastVisitWrapper() {
    const pathname = usePathname();

    useEffect(() => {
        // Exclude auth or error routes
        if (!['/login', '/register', '/404'].includes(pathname)) {
            localStorage.setItem('lastVisited', pathname);
        }
    }, [pathname]);

    return null; // We just want this to run side effects
}
