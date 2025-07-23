'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import SubTabBar from '../../../components/SubTabBar'

export default function ManagementLayout({ children }) {
    const [activeSubTab, setActiveSubTab] = useState('instrument-categories')
    const pathname = usePathname()

    const subTabs = [
        {
            id: 'asset-class',
            label: 'Asset Class',
            href: '/categories/management/asset-class',
        },
        {
            id: 'routes',
            label: 'Routes',
            href: '/categories/management/routes',
        },
        {
            id: 'instrument-categories',
            label: 'Instrument Categories',
            href: '/categories/management',
        },
    ]

    useEffect(() => {
        // Update active tab based on current pathname
        if (pathname === '/categories/management/asset-class') {
            setActiveSubTab('asset-class')
        } else if (pathname === '/categories/management/routes') {
            setActiveSubTab('routes')
        } else if (pathname === '/categories/management') {
            setActiveSubTab('instrument-categories')
        }
    }, [pathname])

    return (
        <div className="space-y-0 -mt-6">
            <SubTabBar
                tabs={subTabs}
                activeTab={activeSubTab}
                onTabChange={setActiveSubTab}
            />
            {children}
        </div>
    )
}
