import React, { useState, useEffect } from 'react';
import TopNav from '../components/TopNav';
import { getWallPaper } from "../api";
import '../css/NotFound.css';

export default function NotFound() {
  let BASE_URL = "http://cn.bing.com";
  let [src, setSrc] = useState("");

  useEffect(() => {
    getWallPaper()
      .then(({ data }: AxiosResponse) => {
        let { images } = data;

        setSrc(BASE_URL + images[0].url);
      });
  }, []);

  return (
    <>
      <div className="page page-404" style={{
        backgroundImage: `url(${src})`,
      }}>
      </div>
      <div className="header header-404 clearfix">
        <TopNav noAffix slotTitle={
          <h1 className="page-404-title">404</h1>
        } />
      </div>
    </>
  );
}
