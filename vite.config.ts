import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import compression from 'vite-plugin-compression';


// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },

    plugins: [react(),
        compression({ algorithm: 'brotliCompress' }),
    ],
    build: {
        minify: 'terser',
    },
});
