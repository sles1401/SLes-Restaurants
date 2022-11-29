import 'regenerator-runtime';
import { precacheAndRoute } from 'workbox-precaching';
import CacheHelper from './utils/cache-helper';

// Daftar asset yang akan dicaching
const assetsToCache = [
    './',
    './icons/maskable_icon.png',
    './icons/maskable_icon_x48.png',
    './icons/maskable_icon_x72.png',
    './icons/maskable_icon_x96.png',
    './icons/maskable_icon_x128.png',
    './icons/maskable_icon_x192.png',
    './icons/maskable_icon_x384.png',
    './icons/maskable_icon_x512.png',
    './index.html',
    './favicon.png',
    './app.bundle.js',
    './app.webmanifest',
    './sw.bundle.js',
];

self.addEventListener('install', (event) => {
    event.waitUntil(CacheHelper.cachingAppShell([...assetsToCache]));
    console.log('Service Worker: Installed');
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(CacheHelper.deleteOldCache());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(CacheHelper.revalidateCache(event.request));
});

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

self.addEventListener('push', () => {
    console.log('Service Worker: Pushed');
});
