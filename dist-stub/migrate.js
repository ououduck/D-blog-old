// 旧站曾注册过缓存整站外壳的 service worker（dblog-v10）。它不注销的话，老访客会一直
// 命中缓存里的旧博客，永远看不到迁移提示页，也看不到 _redirects 的 301。
(function () {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  if ('getRegistrations' in navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      registrations.forEach(function (registration) {
        registration.unregister();
      });
    });
  }

  if (window.caches && caches.keys) {
    caches.keys().then(function (names) {
      names.forEach(function (name) {
        caches.delete(name);
      });
    });
  }
})();
