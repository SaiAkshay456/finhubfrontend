export default function Input({ placeholder, className = "", ...props }) {
    return (
        <input
            className={`w-full px-4 py-2.5 text-sm border border-[var(--color-login-border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-emerald-500)] focus:border-transparent ${className}`}
            placeholder={placeholder}
            {...props}
        />
    )
}
