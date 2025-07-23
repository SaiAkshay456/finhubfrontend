// This is a simple SVG for the Google logo.
// In a real project, you might use a dedicated icon library or an actual image.
export function Google(props) {
    return (
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
            <path
                d="M12.24 10.24v3.52h6.08c-.24 1.44-.96 2.88-2.08 3.84l3.2 2.4c2.08-1.92 3.2-4.8 3.2-8.64 0-.96-.16-1.76-.32-2.56H12.24z"
                fill="#4285F4"
            />
            <path
                d="M12.24 21.6c3.2 0 5.92-1.04 7.84-2.88l-3.2-2.4c-1.04.72-2.4 1.2-4.64 1.2-3.52 0-6.4-2.4-7.44-5.6H1.6v2.4c1.6 3.2 4.8 5.6 10.64 5.6z"
                fill="#34A853"
            />
            <path
                d="M4.8 14.4c-.48-1.2-.48-2.4 0-3.6V8.4H1.6c-.8 1.6-1.2 3.2-1.2 4.8s.4 3.2 1.2 4.8h3.2V14.4z"
                fill="#FBBC05"
            />
            <path
                d="M12.24 4.8c1.76 0 3.2.64 4.32 1.68l2.88-2.88C17.92 1.6 15.2 0 12.24 0 6.4 0 3.2 2.4 1.6 5.6h3.2c1.04-3.2 3.92-5.6 7.44-5.6z"
                fill="#EA4335"
            />
        </svg>
    )
}
