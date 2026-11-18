const C='theoapp-v5',F=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png','pdf-lib.min.js','s21_fr.pdf','s21_fr_multi.pdf','s21_en.pdf','s21_en_multi.pdf'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(F.map(f=>c.add(f).catch(()=>{})))));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
/* Seuls les fichiers de l'application sont mis en cache. Les donnees (Supabase) ne le sont jamais. */
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin)return;e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp));return r}).catch(()=>caches.match(e.request)))});
