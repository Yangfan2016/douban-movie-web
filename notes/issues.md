## tsconfig.json

- 为何将 `isolatedModules` 设置为 `true`  


## TypeScript

- 引入 `react-router-dom` 需要设置 `declare module 'react-router-dom';`

## React

- 为何 背景图 引入不显示   

原因 ant-design 引用的 react-slick 将根元素的 style 样式覆盖了   
源码 https://github.com/akiran/react-slick/blob/master/src/slider.js#L184  
复现 demo https://codesandbox.io/s/92n1x0w1my  
文章 https://yangfan2016.github.io


## Learn
- 图片防盗链的解决办法，[原因](https://www.cnblogs.com/liuxiaopi/p/8084896.html) [规范](https://html.spec.whatwg.org/multipage/semantics.html#meta-referrer)

```html
<meta name="referrer" content="never">
```

## Bug

- 电影详情页 剧照 需要等待所有图片加载完，才能获取到宽度
- 首页，top250 的第一个大图一开始会罩住页面其他内容

## Todo

- 需要在组件卸载时，取消请求，和其他异步任务，订阅事件
