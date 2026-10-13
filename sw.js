// Ashen Descent service worker
// Network-first: always loads the newest game when online, falls back to cache offline.
// Bump V whenever you update the game so old caches get cleared.
const V = 'ashen-v21';
const FILES = ['./', 'index.html', 'scene0.jpg', 'scene1.jpg', 'scene2.jpg', 'scene3.jpg', 'scene4.jpg', 'title-card.jpg', 'intro-narration-01.mp3', 'intro-narration-02.mp3', 'intro-narration-03.mp3', 'intro-narration-04.mp3', 'intro-unknown-voice.mp3', 'boss-warden.mp3', 'boss-lord.mp3', 'boss-reaper.mp3'];
const PEERJS = 'https://unpkg.com/peerjs@1.5.5/dist/peerjs.min.js';

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const c = await caches.open(V);
    await c.addAll(FILES.map(u => new Request(u, { cache: 'reload' })));
    // PeerJS is cross-origin; cache it separately so one failure can't break install.
    try { await c.add(new Request(PEERJS, { mode: 'no-cors' })); } catch (_) {}
  })());
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('ashen-') && k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isPeerJS = req.url === PEERJS;
  // Leave everything else (e.g. PeerJS signaling requests) alone.
  if (!sameOrigin && !isPeerJS) return;

  e.respondWith((async () => {
    try {
      const res = await fetch(req, { cache: 'no-cache' });
      // Only keep good responses so an error page never replaces a working cached file.
      if (res.ok || res.type === 'opaque') {
        const copy = res.clone();
        caches.open(V).then(c => c.put(req, copy));
      }
      return res;
    } catch (_) {
      const cached = await caches.match(req);
      if (cached) return cached;
      if (req.mode === 'navigate') return caches.match('index.html');
      return Response.error();
    }
  })());
});
