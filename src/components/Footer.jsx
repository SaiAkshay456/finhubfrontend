import Link from "next/link"
import { X, Instagram, Facebook, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
    const currentYear = new Date().getFullYear()

    const growwLinks = [
        { label: "About Us", href: "#" },
        { label: "Pricing", href: "#" },
        { label: "Blog", href: "#" },
        { label: "Media & Press", href: "#" },
        { label: "Careers", href: "#" },
        { label: "Help & Support", href: "#" },
        { label: "Trust & Safety", href: "#" },
    ]

    const productLinks = [
        { label: "Stocks", href: "#" },
        { label: "F&O", href: "#" },
        { label: "MTF", href: "#" },
        { label: "ETF", href: "#" },
        { label: "IPO", href: "#" },
        { label: "Credit", href: "#" },
        { label: "Mutual Funds", href: "#" },
    ]

    const productMoreLinks = [
        { label: "Finhub Terminal", href: "#" },
        { label: "Stocks Screener", href: "#" },
        { label: "Algo Trading", href: "#" },
        { label: "Commodities", href: "#" },
        { label: "Finhub Digest", href: "#" },
        { label: "Demat Account", href: "#" },
        { label: "Finhub AMC", href: "#" },
    ]

    const bottomNavLinks = [
        { label: "Share Market", href: "#", active: true },
        { label: "Indices", href: "#" },
        { label: "F&O", href: "#" },
        { label: "Mutual Funds", href: "#" },
        { label: "Funds By Finhub", href: "#" },
        { label: "Calculators", href: "#" },
        { label: "IPO", href: "#" },
        { label: "Miscellaneous", href: "#" },
    ]

    const bottomContentLinks = [
        { label: "Top Gainers Stocks", href: "#" },
        { label: "Top Losers Stocks", href: "#" },
        { label: "Most Traded Stocks", href: "#" },
        { label: "Stocks Feed", href: "#" },
        { label: "FII DII Activity", href: "#" },
    ]

    return (
        <footer className="bg-gray-100 text-gray-600 pt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 pb-8 border-b border-gray-200">
                    {/* Company Info */}
                    <div className="col-span-1">
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                                <div className="w-4 h-4 bg-white rounded-full"></div>
                            </div>
                            <span className="text-xl font-bold text-gray-900">Finhub</span>
                        </Link>
                        <p className="text-sm leading-relaxed mb-4">
                            Vaishnavi Tech Park, South Tower, 3rd Floor
                            <br />
                            Sarjapur Main Road, Hyderabad, Hitech city – 560103
                            <br />
                            Hyderabad
                        </p>
                        <h4 className="font-semibold text-gray-800 mb-3">Contact Us</h4>
                        <div className="flex space-x-4 mb-6">
                            <Link href="#" aria-label="X (Twitter)" className="text-gray-500 hover:text-gray-900">
                                <X className="w-5 h-5" />
                            </Link>
                            <Link href="#" aria-label="Instagram" className="text-gray-500 hover:text-gray-900">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" aria-label="Facebook" className="text-gray-500 hover:text-gray-900">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" aria-label="LinkedIn" className="text-gray-500 hover:text-gray-900">
                                <Linkedin className="w-5 h-5" />
                            </Link>
                            <Link href="#" aria-label="YouTube" className="text-gray-500 hover:text-gray-900">
                                <Youtube className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Groww Links */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-1">
                        <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Finhub</h3>
                        <ul className="space-y-2">
                            {growwLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-sm hover:text-gray-900 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Products Links */}
                    <div className="col-span-1 md:col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-y-2">
                        <div>
                            <h3 className="font-bold text-gray-800 mb-4 uppercase text-sm">Products</h3>
                            <ul className="space-y-2">
                                {productLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link href={link.href} className="text-sm hover:text-gray-900 transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ul className="space-y-2 mt-8 sm:mt-0">
                            {productMoreLinks.map((link, index) => (
                                <li key={index}>
                                    <Link href={link.href} className="text-sm hover:text-gray-900 transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Copyright and Version */}
                <div className="flex flex-col sm:flex-row justify-between items-center py-4 text-xs text-gray-500">
                    <p>© 2016-{currentYear} Finhub. All rights reserved.</p>
                    <p>Version: 6.4.3</p>
                </div>

                {/* Bottom Navigation */}
                <div className="border-t border-gray-200 pt-6 pb-4">
                    <nav className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                        {bottomNavLinks.map((link, index) => (
                            <Link
                                key={index}
                                href={link.href}
                                className={`text-sm font-medium pb-2 ${link.active ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                        {bottomContentLinks.map((link, index) => (
                            <Link key={index} href={link.href} className="hover:text-gray-900 transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}
