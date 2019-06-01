import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Card, Tag, Carousel } from 'antd';
import { CardListTop250Skeleton, CardListSkeleton, ListSkeleton } from "../skeletons/Home";
import TopNav from '../components/TopNav';
import Footer from '../components/Footer';
import { getHotShowing, getNew, getGoodbox, getWeeklyMovie, getTop250 } from "../api";
import * as _ from "lodash";
import LazyLoad from "react-lazy-load";
import '../css/Home.css';

// temp banner
import imgBanner001 from '../assets/banner-001.jpg';
import imgBanner002 from '../assets/banner-002.jpg';
import imgBanner003 from '../assets/banner-003.jpg';
import imgBanner004 from '../assets/banner-004.jpg';
import imgBanner005 from '../assets/banner-005.jpg';


export default function () {

  let [hotShowList, setHotShowList] = useState<any>([]); // 热映
  let [newMovieList, setNewMovieList] = useState<any>([]); // 新片
  let [goodBoxList, setGoodBoxList] = useState<any>([]); // 票房榜
  let [weeklyBox, setWeeklyBox] = useState<any>([]); // 口碑榜
  let [top250List, setTop250List] = useState<any>([]); // top250
  let [boxLastDate, setBoxLastDate] = useState("");
  let [isLoadingHotShow, setIsLoadingHotShow] = useState(true);
  let [isLoadingNewMovie, setIsLoadingNewMovie] = useState(true);
  let [isLoadingGoodBox, setIsLoadingGoodBox] = useState(true);
  let [isLoadingWeeklyBox, setIsLoadingWeeklyBox] = useState(true);
  let [isLoadingTop250, setIsLoadingTop250] = useState(true);

  // temp
  let bannerList = [
    imgBanner001,
    imgBanner002,
    imgBanner003,
    imgBanner004,
    imgBanner005
  ];

  function renderTop250() {
    let len = top250List.length;
    let count = len / 9 | 0;
    let groupList = new Array(count).fill(0);

    groupList = groupList.map((item: number, index: number) => {
      let s = 9 * index;
      let e = s + 9;
      return top250List.slice(s, e);
    });

    return (
      groupList.map((g: any, n: number) => {
        return (
          <div className="cards-box cards-box--top250 clearfix" key={n}>
            {
              g.map((item: any, index: number) => {
                let isFirst = index === 0;
                return (
                  <div className={["card-container", isFirst ? "card-big" : ""].join(" ")} key={n + index}>
                    <Card
                      className="movie-card"
                      hoverable
                      cover={
                        <Link to={`/detail/${item.id}`}>
                          <LazyLoad height={isFirst ? 600 : 300} offsetTop={500}>
                            <img className="card-img" src={item.images.small} />
                          </LazyLoad>
                        </Link>
                      }
                    >
                      <Tag className="img-tag tag-orange">{item.rating.average}</Tag>
                      <Card.Meta
                        title={item.title}
                        description={item.genres.join("/")}
                      />
                    </Card>
                  </div>
                );
              })
            }
          </div>
        );
      })
    );

  }

  useEffect(() => {

    getHotShowing({
      start: 0,
      count: 12,
    })
      .then(({ data }: AxiosResponse) => {
        let { subjects } = data;

        setHotShowList(subjects);
        setIsLoadingHotShow(false);
      });

    getNew()
      .then(({ data }: AxiosResponse) => {
        let { subjects } = data;

        setNewMovieList(subjects);
        setIsLoadingNewMovie(false);
      });

    getGoodbox()
      .then(({ data }: AxiosResponse) => {
        let { subjects, date } = data;

        setBoxLastDate(date);
        setGoodBoxList(subjects);
        setIsLoadingGoodBox(false);
      });

    getWeeklyMovie()
      .then(({ data }: AxiosResponse) => {
        let { subjects } = data;

        setWeeklyBox(subjects);
        setIsLoadingWeeklyBox(false);
      });

    getTop250({
      count: 36,
    })
      .then(({ data }: AxiosResponse) => {
        let { subjects } = data;

        setTop250List(subjects);
        setIsLoadingTop250(false);
      });
  }, []);


  return (
    <div>
      <div className="header">
        <TopNav />
        <div className="header-banner">
          <Carousel autoplay>
            {bannerList.map((item: any, index: number) => {
              return (
                <div
                  className="banner-item"
                  key={index}>
                  <img src={item} alt="banner" />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
      <div className="page page-home">
        <div className="block block-hotshow">
          <div className="line-raw">
            <h2 className="raw-title">正在热映</h2>
          </div>
          <div className="cards-box clearfix">
            {
              isLoadingHotShow ?
                <CardListSkeleton column={6} /> :
                hotShowList.map((item: any, index: number) => {
                  return (
                    <div className="card-container" key={index}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/detail/${item.id}`}>
                            <LazyLoad height={300} offsetTop={500}>
                              <img src={item.images.small} />
                            </LazyLoad>
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">{item.rating.average}</Tag>
                        <Card.Meta
                          title={item.title}
                          description={item.genres.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="block block-newmovie">
          <div className="line-raw">
            <h2 className="raw-title">新片榜</h2>
          </div>
          <div className="cards-box clearfix">
            {
              isLoadingNewMovie ?
                <CardListSkeleton column={4} /> :
                newMovieList.map((item: any, index: number) => {
                  return (
                    <div className="card-container" key={index}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/detail/${item.id}`}>
                            <LazyLoad height={300} offsetTop={500}>
                              <img src={item.images.small} />
                            </LazyLoad>
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">{item.rating.average}</Tag>
                        <Card.Meta
                          title={item.title}
                          description={item.genres.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })}
          </div>
          <div className="rate-box">
            <div className="line-raw">
              <h2 className="raw-title">北美票房榜</h2>
              <p>{boxLastDate} 更新/美元</p>
            </div>
            <ul className="goodbox">
              {
                isLoadingGoodBox ?
                  <ListSkeleton row={2} /> :
                  goodBoxList.map((item: any, index: number) => {
                    let { rank, box, subject } = item;
                    let { title, id, rating, collect_count } = subject;
                    let { average } = rating;

                    let isNew = item.new;

                    let summaryList = [];
                    let summary = "";

                    if (isNew) {
                      summaryList.push("<span class='box-new'>新上榜</span>");
                    }

                    summaryList.push(`${average || 0} 分`);
                    summaryList.push(`${collect_count} 收藏`);
                    summary = summaryList.join(" / ");

                    return (
                      <li className="goodbox-rate" key={index}>
                        <Link to={`/detail/${id}`}>
                          <h3 className="title">{title}</h3>
                          <p className="summary" dangerouslySetInnerHTML={{ __html: summary }}></p>
                          <span className="rank">{rank}</span>
                          <span className="box">{box / 1e4} 万</span>
                        </Link>
                      </li>
                    );
                  })
              }
            </ul>
          </div>
        </div>
        <div className="block block-weekly">
          <div className="line-raw">
            <h2 className="raw-title">一周口碑榜</h2>
            <div className="spotbox">
              <div className="spot"></div>
              <div className="spot"></div>
              <div className="spot"></div>
            </div>
          </div>
          <div className="cards-box weekly-box clearfix">
            {
              weeklyBox.slice(0, 6).map((item: any, index: number) => {
                let { subject } = item;
                let { rating, title } = subject;
                let { average } = rating;
                return (
                  <div className="card-container" key={index}>
                    <div className="rate">{average} 分</div>
                    <div className="title">{title}</div>
                    <div className="dot"></div>
                  </div>
                );
              })
            }
          </div>
          <div className="cards-box clearfix">
            {
              isLoadingWeeklyBox ?
                <CardListSkeleton column={6} /> :
                weeklyBox.slice(0, 6).map((item: any, index: number) => {
                  let { subject } = item;
                  let { rating, title, id, images, genres } = subject;
                  let { average } = rating;
                  return (
                    <div className="card-container" key={index}>
                      <Card
                        className="movie-card"
                        hoverable
                        cover={
                          <Link to={`/detail/${id}/#`}>
                            <LazyLoad height={300} offsetTop={500}>
                              <img src={images.small} />
                            </LazyLoad>
                          </Link>
                        }
                      >
                        <Tag className="img-tag tag-orange">{average}</Tag>
                        <Card.Meta
                          title={title}
                          description={genres.join("/")}
                        />
                      </Card>
                    </div>
                  );
                })}
          </div>
        </div>
        <div className="block block-top250">
          <div className="line-raw">
            <h2 className="raw-title">Top 250</h2>
          </div>
          {
            isLoadingTop250 ?
              <CardListTop250Skeleton /> :
              renderTop250()
          }
        </div>
      </div>
      <Footer />
    </div>
  );

};
