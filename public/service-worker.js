/* SW basic for offline shell */ 
const CACHE='crm-piscine-pro-v2';
const CORE=['/','/index.html','/manifest.webmanifest','/service-worker.js','/icons/icon-192.png','/icons/icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)));self.skipWaiting();});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))));self.clients.claim();});
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET') return;
  const url=new URL(e.request.url);
  if(url.origin===location.origin){
    if(e.request.mode==='navigate'){
      e.respondWith(fetch(e.request).then(r=>{caches.open(CACHE).then(c=>c.put('/',r.clone()));return r;}).catch(()=>caches.match('/')||caches.match('/index.html')));
      return;
    }
    e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(net=>{if(net.ok)caches.open(CACHE).then(c=>c.put(e.request,net.clone()));return net;})));
  }
});