const CACHE_NAME = 'gym-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json'
];

// نصب سرویس ورکر و کش کردن فایل‌ها
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// استفاده از کش در صورت قطع بودن اینترنت
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});
