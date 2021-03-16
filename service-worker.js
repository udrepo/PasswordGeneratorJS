const staticCacheName = 's-app-v1'
const assetUrls = [
    'index.html',
    'script.js',
    'style.css'
]

self.addEventListener('install', async event => {
    const cache = await caches.open(staticCacheName)
    await cache.addAll(assetUrls)
})

// self.addEventListener('activate', async event => {
//     const cacheNames = await caches.keys()
//     await Promise.all(
//         cacheNames.filter(name=>name !== staticCacheName)
//             .map(name=>caches.delete(name))
//     )
// })

self.addEventListener('fetch', event => {
    console.log('Fetch', event.request.url)
    event.respondWith(cacheFirst(event.request))

})

async function cacheFirst(request) {
    const cached = await caches.match(request)
    return cached ?? await fetch(request)
}