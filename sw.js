const CACHE_NAME = "V1_cache_contador_app_vue"
const URLS_to_cache = [
    "./",
    "./img/favicon16.png",
    "./img/favicon32.png",
    "./img/favicon64.png",
    "./img/favicon128.png",
    "./img/favicon256.png",
    "./img/favicon512.png",
    "./img/favicon1024.png",
    "./js/main.js",
    "https://unpkg.com/vue@next",
    "./js/mountApp.js",
    "./css/estilo.css",
    "https://necolas.github.io/normalize.css/8.0.1/normalize.css"
    
];

self.addEventListener("install", e =>{
    e.waitUntil(
        caches.open(CACHE_NAME).then(
            cache => cache.addAll(URLS_to_cache).then(
                ()=> self.skipWaiting()
            ).catch(
                err => console.log(err)
            )
        )
    )
})


self.addEventListener("activate", e=>{
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys().then(
            cacheNames =>{
                return Promise.all(
                    cacheNames.map(
                        cacheName => {
                            if(cacheWhitelist.indexOf(cacheName) === -1){
                                return caches.delete(cacheName)
                            }
                        }
                    )
                )
            }
        ).then(
            () => self.clients.claim()
        )
    )
})

self.addEventListener("fetch", e => {
    e.respondWith(
        caches.match(e.request).then(
            res => {
                if(res){
                    return res
                }
                

                return fetch(e.request)
            }
        )
    )
})