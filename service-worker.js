// Set a name for the current cache
var cacheName = 'v1'; 

// Default files to always cache
var cacheFiles = [
	'/images/image1.webp',
	'/images/image2.webp',
	'/images/image3.webp',
	'/images/image4.webp',
	'/images/image5.webp',
	'/images/image6.webp',
	'/images/image7.webp',
	'/images/image8.webp',
	'/images/image9.webp',
	'/images/image10.webp',
	'/images/image11.webp',
	'/images/image12.webp',
	'/images/image13.webp',
	'/images/0a2c09b0-0015-41ef-813d-ed1b2cf5c3f5.webp',
	'/images/52d9e6aa-14d3-4ab9-985a-2f8af64a1343.webp',
	'/images/80786c17-b2d4-49d1-a4e4-844096d97849.webp',
	'/images/Flag_of_Norway.webp',
	'/images/Flag_of_Qatar.webp',
	'/images/Flag_of_the_Czech_Republic.webp',
	'/images/Flag_of_the_United_States.webp',
	'/images/germany-flag-icon.webp',
	'/images/icons8-bath-50.webp',
	'/images/icons8-fridge-50.webp',
	'/images/icons8-email-sign-48.webp',
	'/images/icons8-microwave-50.webp',
	'/images/icons8-parking-50.webp',
	'/images/icons8-spa-50.webp',
	'/images/icons8-stove-50.webp',
	'/images/icons8-location.gif',
	'/images/icons8-wifi.gif',
	'/images/icons8-towel-50.webp',
	'/images/icons8-tv-50.webp',
	'/images/nigeria.webp',
	'/images/Saudi_arabia_flag_large.webp',
	'/images/whatsapp.webp',
	// Your images here...
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Installed');

    e.waitUntil(
	    caches.open(cacheName).then(function(cache) {
			console.log('[ServiceWorker] Caching cacheFiles');
			return cache.addAll(cacheFiles);
	    })
	);
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activated');

    e.waitUntil(
		caches.keys().then(function(cacheNames) {
			return Promise.all(cacheNames.map(function(thisCacheName) {
				if (thisCacheName !== cacheName) {
					console.log('[ServiceWorker] Removing Cached Files from Cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);
});

self.addEventListener('fetch', function(e) {
	console.log('[ServiceWorker] Fetch', e.request.url);
	
	// If the request does not target an image, skip it
	if (!e.request.url.match(/(jpe?g|png|gif|svg|webp)$/)) {
		console.log("[ServiceWorker] Non-image Fetch, skipping...", e.request.url);
		return;
	}

	e.respondWith(
		caches.match(e.request)
			.then(function(response) {
				if (response) {
					console.log("[ServiceWorker] Found in Cache", e.request.url, response);
					return response;
				}

				return fetch(e.request.clone())
					.then(function(response) {
						if (!response || response.status !== 200) {
							return response;
						}

						var responseClone = response.clone();
						caches.open(cacheName).then(function(cache) {
							cache.put(e.request, responseClone);
							console.log('[ServiceWorker] New Data Cached', e.request.url);
						});

						return response;
					})
					.catch(function(err) {
						console.log('[ServiceWorker] Error Fetching & Caching New Data', err);
					});
			})
	);
});

