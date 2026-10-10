// 「自杀版」service worker：本站点已封存，唯一职责是把旧博客留下的缓存壳拆掉。
//
// 背景：旧站注册过 dblog-v10 的 worker，它会用缓存兜底整站外壳（含离线页与 SPA 路由模式）。
// 部署迁移公告后，如果这个 worker 还在控制页面，老访客会一直看到缓存里的旧博客——
// 既看不到公告，也看不到 _redirects 的 301。因此本文件必须：清缓存 + 注销自己 + 放行网络。
//
// 这里刻意不写 fetch 监听器：不拦截任何请求，全部走网络，跳转与新域名的规范链接才能生效。
self.addEventListener('install', () => {
  // 立即接管，不等其他标签页关闭，让清理在老访客下次打开时马上执行。
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(names.map((name) => caches.delete(name)));

      await self.registration.unregister();

      // 已打开的页面仍在旧 worker 的控制下（缓存壳可能已经渲染完）。主动刷新一次，
      // 让它们以普通文档身份重新请求，命中本文件的注销逻辑与迁移公告。
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach((client) => client.navigate(client.url));
    })(),
  );
});
