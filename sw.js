// THE SYSTEM — service worker (v6)
// Navigations: network-first (3.5s timeout) so updates land when online; cached shell when offline.
// Static same-origin files: cache-first. Google Fonts: stale-while-revalidate.
// Archive builds on raw.githubusercontent.com are pinned to commit SHAs → immutable → cache-first.
// Everything else (e.g. the gorgon-api cloud sync) is not intercepted.
const CACHE='system-v6.0';
// PNG icons are cached on first use (not pre-cached) so a missing file can't block install.
const SHELL=['./','./manifest.webmanifest','./icons/icon.svg'];

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('system-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});

function timeout(ms){return new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms));}

self.addEventListener('fetch',e=>{
  const req=e.request;
  if(req.method!=='GET')return;
  const url=new URL(req.url);
  const scope=new URL(self.registration.scope);

  if(req.mode==='navigate'&&url.origin===scope.origin&&url.pathname.startsWith(scope.pathname)){
    // the app root (with or without ?theme=) is one document; archive pages are cached by path
    const isRoot=url.pathname===scope.pathname||url.pathname===scope.pathname+'index.html';
    const key=isRoot?scope.pathname:url.pathname;
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      try{
        const res=await Promise.race([fetch(req),timeout(3500)]);
        if(res&&res.ok)cache.put(key,res.clone());
        return res;
      }catch(err){
        return (await cache.match(key))||(await cache.match(scope.pathname))||Response.error();
      }
    })());
    return;
  }

  if(url.hostname==='fonts.googleapis.com'||url.hostname==='fonts.gstatic.com'){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const hit=await cache.match(req);
      const net=fetch(req).then(res=>{if(res&&(res.ok||res.type==='opaque'))cache.put(req,res.clone());return res;}).catch(()=>hit);
      return hit||net;
    })());
    return;
  }

  if(url.hostname==='raw.githubusercontent.com'&&url.pathname.startsWith('/countbrackmoor/theSystem/')){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const hit=await cache.match(req);if(hit)return hit;
      const res=await fetch(req);if(res&&res.ok)cache.put(req,res.clone());return res;
    })());
    return;
  }

  if(url.origin===scope.origin&&url.pathname.startsWith(scope.pathname)){
    e.respondWith((async()=>{
      const cache=await caches.open(CACHE);
      const hit=await cache.match(req);if(hit)return hit;
      const res=await fetch(req);if(res&&res.ok)cache.put(req,res.clone());return res;
    })());
  }
});
