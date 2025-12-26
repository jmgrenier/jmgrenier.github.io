import { defineConfig } from 'vite'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import htmlMinifier from 'vite-plugin-html-minifier'
import cleanPlugin from 'vite-plugin-clean'
import ogPlugin from 'vite-plugin-open-graph';
import Sitemap from 'vite-plugin-sitemap'
import viteImagemin from '@vheemstra/vite-plugin-imagemin'
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
        cleanPlugin(),
        ogPlugin({
            basic: {
                title: "Jean-Michel Grenier | Consultant en valorisation des données",
                type: "website",
                url: "https://jmgrenier.ca/",
                image: "https://jmgrenier.ca/CFP-web-8210-BlkwTro_.jpg",
                description: "J'aide les entreprises à prendre de meilleures décisions et à optimiser leurs processus d'affaires.",
                locale: "fr_CA"
            },
            twitter: {
                card: "summary_large_image"
            }
        }),
        Sitemap({
            hostname: 'https://jmgrenier.ca',
            exclude: ['/contact-form-success'],
            robots: [{ userAgent: '*', disallow: '/contact-form-success' }]
        }),
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
