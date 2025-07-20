/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./src/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
    extend: {
      colors: {
        // Custom colors for better theme support
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        },
      },
    },
    plugins: [],
};
