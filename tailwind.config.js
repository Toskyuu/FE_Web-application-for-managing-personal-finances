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
            tertiary: {
                DEFAULT: '#258EA6',
            },
            quaternary: {
                DEFAULT: '#77878B',
            },
            quinary: {
                DEFAULT: '#61b686',
            },
            senary: {
                DEFAULT: '#fabc33',
            },
            septenary: {
                DEFAULT: '#595A4A',
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
                light: '#292929',
                dark: '#F7F5FB',
            },
            success: {
                DEFAULT: '#307a50',
            },
            error: {
                DEFAULT: '#BC4B51',
            },
            form: {
                light: '#ffffff',
                dark: '#474747',
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
        }
    },
    plugins: [
        require('tailwind-scrollbar'),
    ],
};


