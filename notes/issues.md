## tsconfig.json

- 为何将 `isolatedModules` 设置为 `true`  


## TypeScript

- 引入 `react-router-dom` 需要设置 `declare module 'react-router-dom';`


## Learn
- 图片防盗链的解决办法，[原因](https://www.cnblogs.com/liuxiaopi/p/8084896.html) [规范](https://html.spec.whatwg.org/multipage/semantics.html#meta-referrer)

```html
<meta name="referrer" content="never">
```

## Bug

- 需要等待所有图片加载完，才能获取到宽度

## Todo

- 需要在组件卸载时，取消请求，和其他异步任务，订阅事件