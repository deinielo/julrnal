const CACHE = "registro-v1";

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
  event.waitUntil(
    caches.open(CACHE).then(cache => cache.addAll(FILES))
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});