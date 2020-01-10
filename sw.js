const files = [
    '/',
    'imgs/',
    'src/index.html',
    'src/main.css',
    'src/main.js'
]

const fileVersion = 'v1';

self.addEventListener("install", event => {
    console.log("Service worker installing.");

    self.skipWaiting();

    event.waitUntil(
        caches.open(fileVersion)
        .then(cache => {
            return cache.addAll(files);
        })
        .catch(err => {
            console.log("Installation error: ", err);
        })
    )
})

self.addEventListener("activate", event => {
    console.log("Service worker activating.");

    // deleting outdated cache.
    const cacheWhiteList = [fileVersion];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhiteList.indexOf(cacheName) === -1) {
                        console.log("Deleting cache: ", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})

// Cache falling back to network strategy(Part of patterns for handling requests(e.g cache only, network only etc))
self.addEventListener("fetch", event => {
    console.log("Fetch event for ", event.request.url);

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            return response || fetch(event.request)
                // 404 page can be placed here.
                // Dynamically cache content.
                .then(response => {
                    caches.open(fileVersion).then(cache => {
                        cache.put(event.request.url, response.clone());
                        return response;

                    })
                })

        })
        .catch(err => {
            console.log("Fetch error: ", err);
            return caches.match("src/offline.html");
        })
    )
})