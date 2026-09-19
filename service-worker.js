const CACHE = "registro-v4";

const FILES = [
  "./",
  "patients.html",
  "patient.html",
  "index.html",
  "record.html",
  "threecolumns.html",
  "threecolumns_record.html",
  "styles/style.css",
  "script.js",
  "manifest.json"
];

self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE).then(cache => cache.addAll(FILES))
    );
});

self.addEventListener("activate", event => {
    self.clients.claim();

    event.waitUntil(
        caches.keys().then(keys =>
            Promise.all(
                keys
                    .filter(key => key !== CACHE)
                    .map(key => caches.delete(key))
            )
        )
    );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
