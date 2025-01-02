/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './index.html',
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    extend: {
        colors: {
            primary: {
                light: '#ADC698',
                dark: '#ADC698',
            },
            secondary: {
                light: '#9067C6',
                dark: '#9067C6',
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
        Family: {
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

    },

    plugins: [],
};


