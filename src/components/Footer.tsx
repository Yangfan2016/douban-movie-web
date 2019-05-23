import React from "react";
import { Divider } from 'antd';


export default function () {
  return (
    <div className="footer">
      <div className="footer-block content-origin">
        <span>免责声明：内容来源于 <a href="https://movie.douban.com/" target="_blank">豆瓣电影</a> ，接口来源于网络，侵删，禁止商业用途使用</span>
      </div>
      <div className="footer-block copyright">
        <span>Copyright &copy;2019 <a href="https://github.com/Yangfan2016" target="_blank">yangfan2016</a> &lt;15234408101@163.com&gt;</span>
        <Divider type="vertical" />
        <span><a href="https://github.com/Yangfan2016/douban-movie-web/blob/master/LICENSE" target="_blank">MIT</a></span>
      </div>
      <div className="footer-block menu">
        <span><a href="https://github.com/Yangfan2016" target="_blank">关于我</a></span>
        <Divider type="vertical" />
        <span><a href="https://github.com/Yangfan2016" target="_blank">About me</a></span>
        <Divider type="vertical" />
        <span><a href="https://github.com/Yangfan2016" target="_blank">Github</a></span>
        <Divider type="vertical" />
        <span><a href="https://juejin.im/user/5bd570f86fb9a05d396f5d50" target="_blank">掘金</a></span>
        <Divider type="vertical" />
        <span><a href="https://yangfan2016.github.io" target="_blank">博客</a></span>
      </div>
    </div>
  );
};






