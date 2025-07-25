'use client'
import React, { useState } from 'react'
import SubTabBar from '../../components/SubTabBar'
import MutualFundsAssignment from './mutual-funds/page'
import StocksAssignment from './stocks/page'

export default function CategoryAssignment() {
    const [activeSubTab, setActiveSubTab] = useState('mutual-funds')

    const subTabs = [
        {
            id: 'mutual-funds',
            label: 'Mutual Funds',
        },
        {
            id: 'stocks',
            label: 'Stocks',
        },
    ]

    const handleSubTabChange = (tabId) => {
        setActiveSubTab(tabId)
    }

    const renderContent = () => {
        switch (activeSubTab) {
            case 'mutual-funds':
                return <MutualFundsAssignment />
            case 'stocks':
                return <StocksAssignment />
            default:
                return <MutualFundsAssignment />
        }
    }

    return (
        <div className="space-y-0">
            {/* Sub Tab Bar */}
            <SubTabBar
                tabs={subTabs}
                activeTab={activeSubTab}
                onTabChange={handleSubTabChange}
            />

            {/* Content */}
            <div className="pt-6 space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-gray-900">
                        Category Assignment
                    </h1>
                </div>

                {renderContent()}
            </div>
        </div>
    )
}
