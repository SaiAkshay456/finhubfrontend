// components/LoginButton.js
import Link from 'next/link'
// import { Button } from '@/components/ui/button'
// import { ArrowRight } from 'lucide-react'

export function CustomButton({ value = "Login" }) {
    return (<>
        <button className="
        px-4 py-2 
      border border-blue-600 text-blue-600 
      rounded-lg 
      font-medium 
      hover:bg-blue-50 hover:text-blue-700
      transition-all duration-200
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50
      active:bg-blue-100">
            <Link href="/login" className="flex items-center gap-1">
                {value}
            </Link>
        </button>
    </>
    )
}