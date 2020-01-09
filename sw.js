const files = [
    '/',
    'src/index.html',
    'src/main.css',
    'src/main.js'
]

const cacheName = 'v1';

self.addEventListener('install', event => {
    console.log('Service worker installing.');
    self.skipWaiting();
    
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            cache.addAll(files);
        })
    )
})

self.addEventListener('activate', event => {
    console.log('Service worker activating');

    const cacheWhiteList = [cacheName];

    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName1 => {
                    if(cacheWhiteList.indexOf(cacheName1) === -1){
                        return caches.delete(cacheName1);
                    } 
                })
            )
        })
    )
})

self.addEventListener('fetch', event => {
    console.log('Fetching from ', event.request.url);

    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if(response){
                return response;
            }
            return fetch(event.request)
            // Caching files dynamically.
           .then(response => {
               
               return caches.open(cacheName).then(cache => {
                   cache.put(event.request.url, response.clone());
                   return response;
               })
           })
        })
        .catch(err => {
            console.log('Fetch error: ', err);
        })
    )
})
