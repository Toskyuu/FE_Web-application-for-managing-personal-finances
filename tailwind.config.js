/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    darkMode: 'selector',
    theme: {
        colors: {
            primary: {
                DEFAULT: '#5ba355',
            },
            secondary: {
                DEFAULT: '#9067C6',
            },
            background: {
                light: '#F7F5FB',
                dark: '#0A1128',
            },
            surface: {
                light: '#F5F1ED',
                dark: '#0B2027',
            },
            text: {
                light: '#0A1128',
                dark: '#F7F5FB',
            },
            error: '#FF6B6B',
        },
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                heading: ['Poppins', 'sans-serif'],
                mono: ['Roboto Mono', 'monospace'],
            },
            fontSize: {
                tiny: '0.75rem',
                base: '1rem',
                lg: '1.125rem',
                xl: '1.25rem',
                '2xl': '1.5rem',
                '3xl': '1.875rem',
            },
            spacing: {
                72: '18rem',
                84: '21rem',
                96: '24rem',
            },
            boxShadow: {
                'soft': '0 2px 4px rgba(0, 0, 0, 0.1)',
                'hard': '0 4px 6px rgba(0, 0, 0, 0.2)',
            },
            borderRadius: {
                'small': '0.125rem',
                'large': '1rem',
            },
        }
    },
    plugins: [],
};


