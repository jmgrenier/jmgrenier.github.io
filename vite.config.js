import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import htmlMinifier from 'vite-plugin-html-minifier'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
import cleanPlugin from 'vite-plugin-clean'

import imageminMozjpeg from 'imagemin-mozjpeg'
import imageminPngquant from 'imagemin-pngquant'

export default defineConfig({
    base: '/',
    plugins: [
        tailwindcss(),
        htmlMinifier(),
        viteImagemin({
            plugins: {
                jpg: imageminMozjpeg(),
                png: imageminPngquant(),
            }
        }),
        cleanPlugin()
    ],
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                success: resolve(__dirname, 'contact-form-success.html'),
                '404': resolve(__dirname, '404.html'),
            },
        },
    },
})
