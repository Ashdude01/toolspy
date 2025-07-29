const CACHE_NAME = 'toolspy-v1';
const STATIC_CACHE_NAME = 'toolspy-static-v1';
const DYNAMIC_CACHE_NAME = 'toolspy-dynamic-v1';

// Static assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icon-192.png',
  '/icon-512.png',
  '/_next/static/css/app/layout.css',
  '/_next/static/css/app/globals.css',
];

// Cache strategy for different resource types
const CACHE_STRATEGIES = {
  // Cache first for static assets
  static: ['/_next/static/', '/images/', '/logo/'],
  // Network first for dynamic content
  dynamic: ['/api/', '/tools/'],
  // Stale while revalidate for pages
  pages: ['/']
};

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Static assets cached');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Failed to cache static assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== STATIC_CACHE_NAME && 
                     cacheName !== DYNAMIC_CACHE_NAME;
            })
            .map((cacheName) => {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            })
        );
      })
      .then(() => {
        console.log('Service Worker activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension and other non-http requests
  if (!url.protocol.startsWith('http')) {
    return;
  }

  event.respondWith(handleFetch(request));
});

async function handleFetch(request) {
  const url = new URL(request.url);
  const pathname = url.pathname;

  try {
    // Static assets - Cache First
    if (isStaticAsset(pathname)) {
      return await cacheFirstStrategy(request);
    }

    // Dynamic content - Network First
    if (isDynamicContent(pathname)) {
      return await networkFirstStrategy(request);
    }

    // Pages - Stale While Revalidate
    return await staleWhileRevalidateStrategy(request);

  } catch (error) {
    console.error('Fetch error:', error);
    
    // Fallback to cache or offline page
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // Return offline fallback for pages
    if (request.mode === 'navigate') {
      return await caches.match('/') || new Response('Offline', { 
        status: 503, 
        statusText: 'Service Unavailable' 
      });
    }

    throw error;
  }
}

// Cache First Strategy
async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) {
    return cached;
  }

  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(STATIC_CACHE_NAME);
    cache.put(request, response.clone());
  }
  return response;
}

// Network First Strategy
async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await caches.match(request);
    if (cached) {
      return cached;
    }
    throw error;
  }
}

// Stale While Revalidate Strategy
async function staleWhileRevalidateStrategy(request) {
  const cached = await caches.match(request);
  
  const responsePromise = fetch(request).then((response) => {
    if (response.ok) {
      const cache = caches.open(DYNAMIC_CACHE_NAME);
      cache.then((c) => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || responsePromise;
}

// Helper functions
function isStaticAsset(pathname) {
  return CACHE_STRATEGIES.static.some(pattern => pathname.startsWith(pattern));
}

function isDynamicContent(pathname) {
  return CACHE_STRATEGIES.dynamic.some(pattern => pathname.startsWith(pattern));
}

// Background sync for offline actions (if needed)
self.addEventListener('sync', (event) => {
  console.log('Background sync:', event.tag);
  // Handle background sync tasks here if needed
});

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  console.log('Push message received');
  // Handle push notifications here if needed
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    self.clients.openWindow('/')
  );
}); 