const CACHE_NAME = "thales-ife-v1";
const urlsToCache = [
    "/",
    "/icon-192.png",
    "/icon-512.png",
    "/manifest.json",
];

// Install event
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Opened cache");
            return cache.addAll(urlsToCache);
        })
    );
    self.skipWaiting();
});

// Activate event
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log("Deleting old cache:", cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event
self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                return response;
            }
            return fetch(event.request).then((response) => {
                if (!response || response.status !== 200 || response.type !== "basic") {
                    return response;
                }
                const responseToCache = response.clone();
                caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, responseToCache);
                });
                return response;
            });
        })
    );
});

/**
 * Helper function to focus existing app window or open a new one
 * This improves UX by preventing duplicate tabs and enabling smart navigation
 * @param {string} url - The URL to navigate to
 * @returns {Promise<WindowClient>} The focused or newly opened client
 */
async function focusOrOpenWindow(url) {
    const clientList = await self.clients.matchAll({
        type: 'window',
        includeUncontrolled: true
    });

    // Try to focus existing window
    for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
            await client.focus();
            // Send message to the window about notification click
            client.postMessage({ type: 'NOTIFICATION_CLICKED', url });
            return client;
        }
    }

    // Open new window if none exists
    if (self.clients.openWindow) {
        return self.clients.openWindow(url);
    }
}

// Push notification event
self.addEventListener("push", (event) => {
    const options = {
        body: event.data ? event.data.text() : "New notification",
        icon: "/icon-192.png",
        badge: "/badge-72.png",
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1,
        },
        actions: [
            { action: "open", title: "Open App" },
            { action: "close", title: "Close" },
        ],
    };
    event.waitUntil(
        self.registration.showNotification("Thales IFE", options)
    );
});

// Notification click event - now uses focusOrOpenWindow
self.addEventListener("notificationclick", (event) => {
    event.notification.close();

    if (event.action === "open" || !event.action) {
        // Use the new smart window handling function
        const urlToOpen = event.notification.data?.url || "/";
        event.waitUntil(focusOrOpenWindow(urlToOpen));
    }
});

// Custom pilot announcement event sync
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "PILOT_ANNOUNCEMENT") {
        self.registration.showNotification("🎙️ Captain Speaking", {
            body: "Important announcement from the flight deck",
            icon: "/icon-192.png",
            badge: "/badge-72.png",
            vibrate: [200, 100, 200, 100, 200],
            requireInteraction: true,
            tag: "pilot-announcement",
        });
    }
});

self.addEventListener("message", (event) => {
    if (event.data.action === "OPEN_WINDOW") {
        focusOrOpenWindow(event.data.url);
    }
});