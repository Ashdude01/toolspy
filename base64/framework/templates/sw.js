/**
 * Service Worker Template
 * PWA caching and offline functionality
 */

// Configuration
const CACHE_NAME = '{{CACHE_NAME}}-v{{CACHE_VERSION}}';
const STATIC_CACHE_NAME = '{{CACHE_NAME}}-static-v{{CACHE_VERSION}}';
const DYNAMIC_CACHE_NAME = '{{CACHE_NAME}}-dynamic-v{{CACHE_VERSION}}';

// Files to cache immediately
const STATIC_ASSETS = [
    '/',
    '/index.html',
    '/manifest.json',
    '{{FAVICON_PATH}}',
    
    // Framework files
    '/framework/components/header.js',
    '/framework/components/footer.js',
    '/framework/components/toast.js',
    '/framework/components/tool-template.js',
    '/framework/utils/file-utils.js',
    '/framework/utils/validation.js',
    '/framework/utils/helpers.js',
    '/framework/config/app-config.js',
    '/framework/config/seo-config.js',
    
    // Styles (if using local CSS)
    // '/framework/styles/base.css',
    // '/framework/styles/components.css',
    // '/framework/styles/animations.css',
    
    // Add your custom assets here
    {{ADDITIONAL_STATIC_ASSETS}}
];

// URLs to cache dynamically
const DYNAMIC_CACHE_URLS = [
    // External CDN resources
    'https://cdn.tailwindcss.com',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    
    // Add your dynamic cache URLs here
    {{ADDITIONAL_DYNAMIC_URLS}}
];

// URLs to never cache
const NEVER_CACHE = [
    '/api/',
    '/admin/',
    'chrome-extension://',
    
    // Add URLs to never cache
    {{NEVER_CACHE_URLS}}
];

// Cache strategies
const CACHE_STRATEGIES = {
    static: 'cache-first',      // Static assets: cache first, then network
    dynamic: 'stale-while-revalidate',  // Dynamic content: serve from cache, update in background
    api: 'network-first',       // API calls: network first, fallback to cache
    images: 'cache-first'       // Images: cache first
};

// Install event - Cache static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing Service Worker...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Caching static assets...');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                console.log('[SW] Static assets cached successfully');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Failed to cache static assets:', error);
            })
    );
});

// Activate event - Clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating Service Worker...');
    
    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        // Delete old caches
                        if (cacheName.startsWith('{{CACHE_NAME}}') && 
                            cacheName !== STATIC_CACHE_NAME && 
                            cacheName !== DYNAMIC_CACHE_NAME) {
                            console.log('[SW] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('[SW] Service Worker activated');
                return self.clients.claim();
            })
            .catch((error) => {
                console.error('[SW] Failed to activate Service Worker:', error);
            })
    );
});

// Fetch event - Handle requests with caching strategies
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);
    
    // Skip caching for certain URLs
    if (shouldNeverCache(request.url)) {
        return;
    }
    
    // Handle different types of requests
    if (isStaticAsset(request.url)) {
        event.respondWith(handleStaticAsset(request));
    } else if (isAPIRequest(request.url)) {
        event.respondWith(handleAPIRequest(request));
    } else if (isImageRequest(request)) {
        event.respondWith(handleImageRequest(request));
    } else {
        event.respondWith(handleDynamicRequest(request));
    }
});

// Cache strategy implementations

/**
 * Handle static assets (cache-first strategy)
 */
async function handleStaticAsset(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Failed to handle static asset:', error);
        return caches.match('/offline.html') || new Response('Offline', { status: 503 });
    }
}

/**
 * Handle API requests (network-first strategy)
 */
async function handleAPIRequest(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('[SW] Network failed for API request:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response(JSON.stringify({ error: 'Network unavailable' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

/**
 * Handle image requests (cache-first strategy)
 */
async function handleImageRequest(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE_NAME);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('[SW] Failed to handle image request:', error);
        // Return a fallback image or just fail
        return new Response('', { status: 503 });
    }
}

/**
 * Handle dynamic requests (stale-while-revalidate strategy)
 */
async function handleDynamicRequest(request) {
    try {
        const cache = await caches.open(DYNAMIC_CACHE_NAME);
        const cachedResponse = await cache.match(request);
        
        // Fetch in background and update cache
        const networkPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        }).catch(() => null);
        
        // Return cached response immediately, or wait for network
        return cachedResponse || await networkPromise || 
               caches.match('/offline.html') || 
               new Response('Offline', { status: 503 });
    } catch (error) {
        console.error('[SW] Failed to handle dynamic request:', error);
        return new Response('Error', { status: 500 });
    }
}

// Helper functions

/**
 * Check if URL should never be cached
 */
function shouldNeverCache(url) {
    return NEVER_CACHE.some(pattern => url.includes(pattern));
}

/**
 * Check if request is for a static asset
 */
function isStaticAsset(url) {
    return STATIC_ASSETS.some(asset => url.endsWith(asset)) ||
           url.match(/\.(js|css|woff2?|ttf|eot)$/);
}

/**
 * Check if request is an API call
 */
function isAPIRequest(url) {
    return url.includes('/api/') || url.includes('/data/');
}

/**
 * Check if request is for an image
 */
function isImageRequest(request) {
    return request.destination === 'image' ||
           request.url.match(/\.(jpg|jpeg|png|gif|webp|svg|ico)$/);
}

// Background sync (if supported)
if ('sync' in self.registration) {
    self.addEventListener('sync', (event) => {
        if (event.tag === 'background-sync') {
            event.waitUntil(handleBackgroundSync());
        }
    });
}

/**
 * Handle background sync
 */
async function handleBackgroundSync() {
    try {
        console.log('[SW] Performing background sync...');
        // Add your background sync logic here
        {{BACKGROUND_SYNC_CODE}}
    } catch (error) {
        console.error('[SW] Background sync failed:', error);
    }
}

// Push notifications (if supported)
if ('push' in self.registration) {
    self.addEventListener('push', (event) => {
        const options = {
            body: event.data ? event.data.text() : 'New update available',
            icon: '{{NOTIFICATION_ICON}}',
            badge: '{{NOTIFICATION_BADGE}}',
            tag: 'update',
            renotify: true,
            actions: [
                {
                    action: 'open',
                    title: 'Open App'
                },
                {
                    action: 'dismiss',
                    title: 'Dismiss'
                }
            ]
        };
        
        event.waitUntil(
            self.registration.showNotification('{{APP_NAME}}', options)
        );
    });
    
    self.addEventListener('notificationclick', (event) => {
        event.notification.close();
        
        if (event.action === 'open') {
            event.waitUntil(
                clients.openWindow('{{SITE_URL}}')
            );
        }
    });
}

// Message handling
self.addEventListener('message', (event) => {
    if (event.data && event.data.type) {
        switch (event.data.type) {
            case 'SKIP_WAITING':
                self.skipWaiting();
                break;
            case 'GET_VERSION':
                event.source.postMessage({ version: '{{CACHE_VERSION}}' });
                break;
            case 'CLEAR_CACHE':
                clearAllCaches().then(() => {
                    event.source.postMessage({ success: true });
                });
                break;
        }
    }
});

/**
 * Clear all caches
 */
async function clearAllCaches() {
    try {
        const cacheNames = await caches.keys();
        await Promise.all(
            cacheNames.map(cacheName => caches.delete(cacheName))
        );
        console.log('[SW] All caches cleared');
    } catch (error) {
        console.error('[SW] Failed to clear caches:', error);
    }
}

// Periodic background sync (if supported)
if ('periodicSync' in self.registration) {
    self.addEventListener('periodicsync', (event) => {
        if (event.tag === 'periodic-background-sync') {
            event.waitUntil(handlePeriodicBackgroundSync());
        }
    });
}

/**
 * Handle periodic background sync
 */
async function handlePeriodicBackgroundSync() {
    try {
        console.log('[SW] Performing periodic background sync...');
        // Add your periodic sync logic here
        {{PERIODIC_SYNC_CODE}}
    } catch (error) {
        console.error('[SW] Periodic background sync failed:', error);
    }
}

console.log('[SW] Service Worker script loaded'); 