const proxy = require('http-proxy-middleware');

module.exports = function (app) {
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
};
