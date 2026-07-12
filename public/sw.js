// KlarFit service worker — manual implementation (no Workbox/next-pwa dependency).
// Bump VERSION on any caching-strategy change to invalidate old caches on activate.
const VERSION = "klarfit-v1";
const SHELL_CACHE = `shell-${VERSION}`;
const PAGES_CACHE = `pages-${VERSION}`;
const ASSETS_CACHE = `assets-${VERSION}`;
const VIDEO_CACHE = `videos-${VERSION}`;
const CURRENT_CACHES = [SHELL_CACHE, PAGES_CACHE, ASSETS_CACHE, VIDEO_CACHE];

const OFFLINE_URL = "/offline";
const SHELL_URLS = ["/", OFFLINE_URL, "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => !CURRENT_CACHES.includes(key)).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

function isVideoRequest(url) {
  return url.pathname.startsWith("/exercises/") && url.pathname.endsWith(".mp4");
}

function isStaticAsset(url) {
  return (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/icons/") ||
    url.pathname.startsWith("/placeholders/")
  );
}

self.addEventListener("fetch", (event) => {
  const request = event.request;
  if (request.method !== "GET") return;

  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  if (isVideoRequest(url)) {
    event.respondWith(serveVideo(request));
    return;
  }

  if (isStaticAsset(url)) {
    event.respondWith(cacheFirst(request, ASSETS_CACHE));
    return;
  }

  if (request.mode === "navigate" || (request.headers.get("accept") || "").includes("text/html")) {
    event.respondWith(networkFirstPage(request));
    return;
  }

  event.respondWith(staleWhileRevalidate(request, ASSETS_CACHE));
});

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  } catch (err) {
    return cached || Response.error();
  }
}

async function networkFirstPage(request) {
  const cache = await caches.open(PAGES_CACHE);
  try {
    const response = await fetch(request);
    if (response && response.status === 200) cache.put(request, response.clone());
    return response;
  } catch (err) {
    const cached = await cache.match(request);
    if (cached) return cached;
    const shellCache = await caches.open(SHELL_CACHE);
    const offline = await shellCache.match(OFFLINE_URL);
    return offline || Response.error();
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const network = fetch(request)
    .then((response) => {
      if (response && response.status === 200) cache.put(request, response.clone());
      return response;
    })
    .catch(() => cached || Response.error());
  return cached || network;
}

// --- Video caching -----------------------------------------------------
// <video> elements request byte ranges (Range header, 206 responses), so we
// can't just cache the raw request/response pair — a cached 206 for one range
// would get served for every other range on that URL. Instead: pass the first
// request straight to the network (so playback isn't blocked), fetch the full
// file in the background exactly once per URL, and once it's cached, slice it
// ourselves to answer whatever Range the <video> element asks for — including
// fully offline.

const inFlightFullFetches = new Set();

function fetchAndCacheFullVideo(url, cache) {
  if (inFlightFullFetches.has(url)) return;
  inFlightFullFetches.add(url);
  fetch(url)
    .then((response) => {
      if (response && response.status === 200) return cache.put(new Request(url), response);
    })
    .catch(() => {})
    .finally(() => inFlightFullFetches.delete(url));
}

function parseRange(rangeHeader, size) {
  const match = /bytes=(\d*)-(\d*)/.exec(rangeHeader || "");
  if (!match) return null;
  let start = match[1] ? parseInt(match[1], 10) : 0;
  let end = match[2] ? parseInt(match[2], 10) : size - 1;
  if (Number.isNaN(start)) start = 0;
  if (Number.isNaN(end) || end >= size) end = size - 1;
  return { start, end };
}

async function serveVideo(request) {
  const cache = await caches.open(VIDEO_CACHE);
  const cacheKey = new Request(request.url);
  const cached = await cache.match(cacheKey);

  if (!cached) {
    fetchAndCacheFullVideo(request.url, cache);
    try {
      return await fetch(request);
    } catch (err) {
      return Response.error();
    }
  }

  const blob = await cached.blob();
  const size = blob.size;
  const range = parseRange(request.headers.get("range"), size);

  if (!range) {
    return new Response(blob, {
      status: 200,
      headers: { "Content-Type": blob.type || "video/mp4", "Content-Length": String(size), "Accept-Ranges": "bytes" },
    });
  }

  const { start, end } = range;
  const chunk = blob.slice(start, end + 1);
  return new Response(chunk, {
    status: 206,
    headers: {
      "Content-Type": blob.type || "video/mp4",
      "Content-Range": `bytes ${start}-${end}/${size}`,
      "Content-Length": String(end - start + 1),
      "Accept-Ranges": "bytes",
    },
  });
}
