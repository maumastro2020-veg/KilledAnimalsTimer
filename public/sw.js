const CACHE_NAME = "av-shell-v1";
const FALLBACK_URL = "/timer";

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim()),
  );
});

// Navigations go network-first so a working connection always gets the
// current deploy; the cache only kicks in when the network request itself
// fails — e.g. the OS discarded this tab in the background and the
// automatic reload lands before the phone's radio has reconnected.
async function handleNavigation(request) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request);
    cache.put(request, response.clone());
    return response;
  } catch {
    return (await cache.match(request)) || (await cache.match(FALLBACK_URL)) || Response.error();
  }
}

// Next's hashed build assets are immutable per filename, so a cache-first
// read is safe and never goes stale — a new build ships new filenames.
async function handleStaticAsset(request) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) cache.put(request, response.clone());
  return response;
}

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  if (request.mode === "navigate") {
    event.respondWith(handleNavigation(request));
    return;
  }

  const url = new URL(request.url);
  if (url.origin === self.location.origin && url.pathname.startsWith("/_next/static/")) {
    event.respondWith(handleStaticAsset(request));
  }
});
