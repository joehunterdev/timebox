import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    // build: {
    //     sourcemap: true, // Enable source maps
    //     outDir: 'public/js/dist-demo',
    //     base: '/timebox/', // Set the base URL
    // },
    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/App.jsx',
            ],
            refresh: true,
        }),
        react(),
    ],
});