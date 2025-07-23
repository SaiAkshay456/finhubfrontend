export default function Button({ children, variant = "primary", size = "md", className = "", ...props }) {
    const baseClasses =
        "inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"

    const variants = {
        primary:
            "bg-[var(--color-emerald-500)] hover:bg-[var(--color-emerald-600)] text-white focus:ring-[var(--color-emerald-500)]",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-900 focus:ring-gray-500",
        // New variants for login page
        dark: "bg-[var(--color-login-dark-text)] hover:bg-gray-800 text-white focus:ring-gray-700",
        outline: "border border-[var(--color-login-border)] bg-white hover:bg-gray-50 text-gray-700 focus:ring-gray-500",
    }

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-sm",
        lg: "px-6 py-3 text-base",
        full: "w-full py-2.5 text-base", // New size for full-width buttons
    }

    return (
        <button className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
            {children}
        </button>
    )
}
