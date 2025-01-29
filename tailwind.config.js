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
                light: '#fff',
                dark: '#171717',
            },
            surface: {
                light: '#fbf2e6',
                dark: '#232323',
            },
            text: {
                light: '#393939',
                dark: '#F7F5FB',
            },
            success: {
                DEFAULT: '#4cd684',
            },
            error: {
                DEFAULT: '#BC4B51',
            },
            form: {
                light: '#fbf2e6',
                dark: '#303030',
            }
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
            },
            keyframes: {
                slideUp: {
                    '0%': { opacity: 0, transform: 'translateY(100px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                },
                slideDown: {
                    '0%': { opacity: 1, transform: 'translateY(0)' },
                    '100%': { opacity: 0, transform: 'translateY(100px)' },
                },
            },
            animation: {
                slideUp: 'slideUp 0.4s ease-out forwards',
                slideDown: 'slideDown 0.4s ease-in forwards',
            },

        }
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};


