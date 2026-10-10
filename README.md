# D-blog-old

`blog.pldduck.com` 的旧博客仓库，已封存。站点内容与源码合并进
**[ououduck/pldduck](https://github.com/ououduck/pldduck)**，由 **<https://www.pldduck.com>** 单域提供服务。

本仓库现在只做一件事：**旧域名的迁移公告与 301 跳转**。不再构建，不再写内容。

保留它的原因是 `blog.pldduck.com` 上有大量外部链接与搜索引擎收录。文章地址 `/post/<id>`
在新站逐字节不变，因此老读者与爬虫请求旧地址时被 301 送到新站同一位置，书签与权重都保得住。

## 目录结构

```text
dist-stub/              部署产物（手写静态文件，无构建步骤）
  index.html            根路径迁移公告：200 返回，3 秒后自动跳新站首页
  404.html              未知路径的兜底公告（Cloudflare Pages 对未匹配路径返回它）
  migrate.css           公告页样式（纯黑白，不引外部字体）
  migrate.js            注销旧 service worker 并清空其缓存
  sw.js                 「自杀版」worker：清缓存 + 注销自己，替换旧博客留下的 dblog-v10
  _redirects            Cloudflare Pages 重定向表：旧路径逐条 301 到新站同路径
  _headers              安全头与缓存策略（公告页与 sw.js 强制回源校验）
.github/workflows/
  deploy.yml            手动触发，把 dist-stub 直传到 Cloudflare Pages 项目 d-blog
  feishu-webhook.yml    GitHub 事件 → 飞书通知
scripts/                飞书通知所需的 4 个脚本（仅用 Node 内置模块，CI 不装包也能跑）
```

## 改跳转规则

编辑 `dist-stub/_redirects`：

- 规则自上而下匹配，先匹配先生效；`:splat` 承接 `*` 匹配到的部分。
- **根路径 `/` 故意不写规则**，否则公告页永远看不到。
- 目标 URL 不带查询串时，Cloudflare 会保留原始查询串（`/search?q=xxx` 的 `q` 会跟过去）。
- 只有 Cloudflare Pages 支持 `_redirects`；本站不再部署 EdgeOne Pages，正是因为它没有等价能力。

## 本地预览

`_redirects` / `_headers` 是 Cloudflare Pages 的平台能力，本地静态服务器不认，只能看公告页外观：

```bash
npx --yes serve dist-stub   # http://localhost:3000，深层路径落到 404.html 而非 301
```

## 部署

GitHub Actions → `Deploy migration notice to Cloudflare Pages` → Run workflow。
需要仓库 Secrets：`CLOUDFLARE_API_TOKEN`、`CLOUDFLARE_ACCOUNT_ID`。CI 里不装依赖、不跑构建。

> 必须在 `pldduck` 已在线之后再部署本仓库。反过来的话，正在读博客的人会先撞上跳转页，
> 而新站还没有对应的文章。

## 取回旧源码

完整的 React + Vite 源码、内容目录与 CI 都在本仓库 git 历史里：

```bash
git log --oneline -- src       # 找到封存前的提交
git checkout <commit> -- src   # 整体取回
```

同一份代码的现役版本在 [ououduck/pldduck](https://github.com/ououduck/pldduck)。
