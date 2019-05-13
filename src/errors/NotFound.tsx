import React from 'react';
import '../css/NotFound.css';

import { useState } from "react";

import { getWallPaper } from "../api";

export default function NotFound() {
  let BASE_URL = "http://cn.bing.com";
  let [src, setSrc] = useState("");

  getWallPaper()
    .then(({ data }: any) => {
      let { images } = data;

      setSrc(BASE_URL + images[0].url);
    });

  return (
    <div className="page page-404" style={{
      backgroundImage: `url(${src})`,
    }}>
      <h1 className="title">404</h1>
    </div>
  );
}
