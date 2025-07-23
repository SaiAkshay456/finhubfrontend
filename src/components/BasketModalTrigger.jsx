'use client';

import { useState } from 'react';
import CreateBasketModal from './CreateBasketModal';

export default function BasketModalTrigger() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="bg-gradient-to-r from-[#00d09c] to-[#00b98b] text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                + Create Basket
            </button>

            <CreateBasketModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        </>
    );
}
