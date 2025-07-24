'use client'
import { useState } from 'react'
import TabBar from '../../components/TabBar'

export default function CategoriesLayout({ children }) {
    const [activeTab, setActiveTab] = useState('assignment')

    const tabs = [
        { id: 'assignment', label: 'Category Assignment', href: '/categories' },
        {
            id: 'management',
            label: 'Category Management',
            href: '/categories/management',
        },
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            <TabBar
                tabs={tabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
            <main className="container mx-auto px-4 py-6">{children}</main>
        </div>
    )
}
