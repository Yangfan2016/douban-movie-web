const Koa = require("koa");
const Router = require("koa-router");
const proxy = require("koa-server-http-proxy");
const static = require("koa-static");
const fs = require("fs");
const path = require("path");

const router = Router();
const app = new Koa;

const PORT = 9876;


// views
router.get("/*", async (ctx, next) => {
  let str = fs.readFileSync(path.resolve(__dirname, "../build/index.html"), "utf-8");
  ctx.response.body = str;
});

// proxy
app.use(proxy('/api', {
  target: 'http://api.douban.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/v2', // 重写路径
  },
}));
app.use(proxy('/bing', {
  target: 'https://www.bing.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/bing': '/', // 重写路径
  },
}));

// static
app.use(static(path.resolve(__dirname, "../build")));

// routes
app.use(router.routes());

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

