import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';


export default defineConfig({
    server: {
        host: true,
        port: 3000,
        hmr: {
            host: "localhost",
        },
        cors: {
            origin: 'http://localhost:8000',
            credentials: true,
        },
        origin: 'http://localhost:3000',
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.js'],
            refresh: true,
        }),
        vue(),
        tailwindcss(),
    ],
});
