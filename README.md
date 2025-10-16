replica-site

这是一个轻量的 Next.js 网站骨架，用作参考模板：
- 简单首页、文章列表
- 站内搜索 API（基于示例数据的全文过滤）

快速开始：

```bash
cd replica-site
npm install
npm run dev
```

## E-commerce MVP (local setup)

This project includes a minimal e-commerce prototype using Prisma (SQLite) and Stripe (test mode).

1. Copy `.env.example` to `.env` and fill `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.
2. Install dependencies:

```bash
npm install
```

3. Generate Prisma client and run migrations (creates `dev.db`):

```bash
npm run prisma:generate
npm run migrate
```

4. Seed example products:

```bash
npm run seed
```

5. Run dev server:

```bash
npm run dev
```

Checkout pages:
- /shop — 商品目录
- /shop/[slug] — 商品详情
- /cart — 购物车与结算 (Stripe test)

On production (Vercel), set environment variables: `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_SITE_URL`.

部署建议：Vercel 或 Netlify（Next.js 支持良好）。

部署到 Vercel（推荐）

1. 在 [Vercel](https://vercel.com) 使用 GitHub 账号登录并创建新项目，连接到本仓库。
2. 在 Vercel 项目设置中添加环境变量 `NEXT_PUBLIC_SITE_URL`（例如 `https://your-domain.com`）。
3. 部署后，Vercel 会自动运行 `npm run build`，在构建前会运行生成 sitemap 的脚本。

环境变量

复制 `.env.example` 到 `.env` 并修改 `SITE_URL`（用于本地构建生成 sitemap）。
