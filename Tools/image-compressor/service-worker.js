const CACHE_NAME = 'image-compressor-v2';
const CACHE_VERSION = '2.0.0';
const FULL_CACHE_NAME = `${CACHE_NAME}-${CACHE_VERSION}`;

// Files to cache for offline functionality
const CACHE_FILES = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/utils/compression-utils.js',
    '/utils/format-utils.js',
    '/utils/exif-utils.js',
    '/workers/compression-worker.js',
    'https://cdn.jsdelivr.net/npm/browser-image-compression@2.0.2/dist/browser-image-compression.js'
];

// Install event - cache files
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    event.waitUntil(
        caches.open(FULL_CACHE_NAME)
            .then(cache => {
                console.log('Caching files...');
                return cache.addAll(CACHE_FILES);
            })
            .then(() => {
                console.log('All files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Error caching files:', error);
            })
    );
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    console.log('Service Worker activating...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName.startsWith(CACHE_NAME) && cacheName !== FULL_CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker activated');
            return self.clients.claim();
        })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip external requests (except for CDN resources)
    const url = new URL(event.request.url);
    if (url.origin !== location.origin && !url.hostname.includes('cdn.jsdelivr.net')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return cached version if available
                if (response) {
                    return response;
                }

                // Otherwise fetch from network
                return fetch(event.request)
                    .then(response => {
                        // Don't cache if not successful
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache
                        caches.open(FULL_CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
            })
            .catch(() => {
                // If both cache and network fail, return offline page for navigation requests
                if (event.request.mode === 'navigate') {
                    return caches.match('/index.html');
                }
            })
    );
});

// Handle file sharing
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SHARE_FILES') {
        console.log('Received shared files:', event.data.files);
        // Forward to main thread
        self.clients.matchAll().then(clients => {
            clients.forEach(client => {
                client.postMessage({
                    type: 'SHARED_FILES',
                    files: event.data.files
                });
            });
        });
    }
});

// Background sync for failed uploads
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync-upload') {
        console.log('Background sync triggered');
        event.waitUntil(
            // Handle background upload logic
            handleBackgroundUpload()
        );
    }
});

// Handle background upload
async function handleBackgroundUpload() {
    try {
        // Get pending uploads from IndexedDB
        const pendingUploads = await getPendingUploads();
        
        for (const upload of pendingUploads) {
            try {
                await retryUpload(upload);
                await removePendingUpload(upload.id);
            } catch (error) {
                console.error('Failed to upload:', error);
            }
        }
    } catch (error) {
        console.error('Background upload error:', error);
    }
}

// Mock functions for background sync (to be implemented)
async function getPendingUploads() {
    // Implementation would use IndexedDB to store pending uploads
    return [];
}

async function retryUpload(upload) {
    // Implementation would retry the upload
    return Promise.resolve();
}

async function removePendingUpload(id) {
    // Implementation would remove from IndexedDB
    return Promise.resolve();
}

// Push notification handler
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/assets/icon-192x192.png',
            badge: '/assets/badge-72x72.png',
            vibrate: [100, 50, 100],
            data: data.data,
            actions: [
                {
                    action: 'open',
                    title: 'Open App',
                    icon: '/assets/action-open.png'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss',
                    icon: '/assets/action-dismiss.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'open') {
        event.waitUntil(
            clients.openWindow('/')
        );
    } else if (event.action === 'dismiss') {
        // Just close the notification
        return;
    } else {
        // Default action - open app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Update check
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'CHECK_UPDATE') {
        // Check for updates
        self.registration.update().then(() => {
            event.ports[0].postMessage({ type: 'UPDATE_CHECKED' });
        });
    }
});

console.log('Service Worker script loaded successfully'); 