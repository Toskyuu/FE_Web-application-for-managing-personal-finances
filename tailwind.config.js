/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    darkMode: 'selector',
    theme: {
        colors: {
            primary: {
                DEFAULT: '#530d57',
            },
            secondary: {
                DEFAULT: '#702b73',
            },
            background: {
                light: '#FEF5EF',
                dark: '#171717',
            },
            surface: {
                light: '#cac1c1',
                dark: '#232323',
            },
            text: {
                light: '#121212',
                dark: '#F7F5FB',
            },
            success: {
                DEFAULT: '#4cd684',
            },
            error: {
                DEFAULT: '#BC4B51',
            },
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
                mono: ['Roboto Mono', 'monospace'],
            },
            boxShadow: {
                'soft': '0 2px 4px rgba(0, 0, 0, 0.1)',
                'hard': '0 4px 6px rgba(0, 0, 0, 0.2)',
            },
            minWidth: {
                '40': '10rem',
            }
        }
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};


