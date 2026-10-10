# AGENT.md — 本仓库已封存

给在这里工作的 AI 助手：本仓库不再开发，只承担旧域名的 301 跳转与迁移公告。
开始任何修改前先读 `README.md`。

## 硬性约束

1. **不要恢复构建流程。** 不要重新引入 `package.json`、Vite、React 或任何依赖安装步骤。
   站点代码在 `ououduck/pldduck`，这里只放静态文件。
2. **不要在这里写内容。** 文章、说说、友链一律去 `pldduck` 仓库的 `posts/`、`shuoshuo/`、
   `friends/` 提交，Pages CMS 也挂在那边。
3. 允许改动的范围只有 `dist-stub/` 下的静态文件，与 `.github/workflows/` 两个工作流
   （及其依赖的 `scripts/`）。新增文件前先确认它属于「公告页 + 跳转」这一件事。
4. `dist-stub/` 是**手写的部署产物**，不是构建输出。改完就是最终结果，不要去找构建命令。
5. `_redirects` 与 `_headers` 是 Cloudflare Pages 专有格式，注释用 `#`。
6. 根路径 `/` 必须保持 200 返回公告页，不能被任何规则 301 掉。
7. `dist-stub/sw.js` 与 `migrate.js` 的作用是清除旧博客的 service worker 缓存。
   删掉它们会让老访客卡在缓存的旧站点里，看不到迁移公告——除非有明确理由，不要动。
8. `scripts/` 只保留飞书通知所需的 4 个脚本，全部只用 Node 内置模块。给 `feishu-webhook.yml`
   新增 workflow 时，必须同步它的 `workflow_run.workflows` 白名单，否则该 workflow 的失败
   不会有任何提醒（白名单是手动维护的，GitHub 不会报错）。
9. 沟通与 git commit message 一律用中文。
10. **只 commit，不 push**，除非用户明确要求推送。
11. 部署（Run workflow）会影响线上旧域名的访问，属于对外可见操作：动手前先向用户确认。

## 背景

旧博客 `blog.pldduck.com` 与旧主页 `www.pldduck.com` 已合并为单站 `www.pldduck.com`
（仓库 `ououduck/pldduck`）。本仓库计划改名为 `D-blog-old` 并停止一切开发。
