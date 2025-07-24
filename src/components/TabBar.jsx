'use client'
import { useRouter, usePathname } from 'next/navigation'
import { useEffect } from 'react'

export default function TabBar({ tabs, activeTab, onTabChange }) {
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // Update active tab based on current pathname
        const currentTab = tabs.find((tab) => tab.href === pathname)
        if (currentTab && currentTab.id !== activeTab) {
            onTabChange(currentTab.id)
        }
    }, [pathname, tabs, activeTab, onTabChange])

    const handleTabClick = (tab) => {
        onTabChange(tab.id)
        router.push(tab.href)
    }

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="container mx-auto px-4">
                <nav className="flex space-x-8" aria-label="Tabs">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => handleTabClick(tab)}
                            className={`
                py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${
                    activeTab === tab.id
                        ? 'border-emerald-500 text-emerald-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
                            aria-current={
                                activeTab === tab.id ? 'page' : undefined
                            }
                        >
                            {tab.label}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    )
}
