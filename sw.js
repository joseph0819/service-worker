// sw.js

const cacheName = "my-cache-v4";
const filesToCache = [
  "/index.html",
  "/contact.html",
  "/about.html",
  "/main.css",
  "/index.js",
  // Add more files you want to cache
];

self.addEventListener("install", (event) => {
  // The waitUntil method extends the lifetime of the installation event
  console.log("Service Worker: Installed");
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log("Opened cache");
      // The addAll method caches the specified URLs during installation
      return cache.addAll(filesToCache);
    })
  );
});

// Event listener for the activation phase
self.addEventListener("activate", (event) => {
  // Extend the activation event's lifetime until cleanup is complete
  console.log("Service Worker: Activated");
  event.waitUntil(
    // Get all existing cache names
    caches.keys().then((cacheNames) => {
      // Use Promise.all to wait for all cache cleanup tasks to complete
      return Promise.all(
        // Iterate through each cache name
        cacheNames.map((cache) => {
          // Check if the cache is not in the whitelist
          if (cache !== cacheName) {
            console.log("Service Worker: Deleting old caches");
            // Delete caches that are not in the whitelist
            return caches.delete(cache);
          }
        })
      );
    })
  );
});


self.addEventListener("fetch", (event) => {
  // Respond with cached resources or fetch from the network
  console.log("Service Worker: Fetching");
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

// async function handleFetch(request) {
//   // Check if the request is already in the cache
//   const cachedResponse = await caches.match(request);

//   if (cachedResponse) {
//     // If found in the cache, return the cached response
//     return cachedResponse;
//   }

//   // If not in the cache, fetch from the network
//   const networkResponse = await fetch(request);

//   // Open the cache and store the fetched response for future use
//   const cache = await caches.open("my-cache");
//   cache.put(request, networkResponse.clone());

//   // Return the network response
//   return networkResponse;
// }
