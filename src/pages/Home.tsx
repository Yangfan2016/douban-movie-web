import React from "react";
import {
  Card,
  Tag,
  Carousel,
  Icon,
  Affix,
  Divider,
} from 'antd';
import {
  getHotShowing,
  getNew,
  getGoodbox,
  getContentBySearch,
  getWeeklyMovie,
  getTop250,
} from "../api";
import { Link } from 'react-router-dom';
import {
  CardListTop250Skeleton,
  CardListSkeleton,
  ListSkeleton,
} from "../skeletons/Home";
import '../css/Home.css';
import * as _ from "lodash";
import LazyLoad from "react-lazy-load";

// temp banner
import imgBanner001 from '../assets/banner-001.jpg';
import imgBanner002 from '../assets/banner-002.jpg';
import imgBanner003 from '../assets/banner-003.jpg';
import imgBanner004 from '../assets/banner-004.jpg';
import imgBanner005 from '../assets/banner-005.jpg';


class Home extends React.Component {
  getSuggestionBySearch: (value: string) => any
  constructor(props: any) {
    super(props);
    this.state = {
      hotShowList: [], // 热映
      newMovieList: [], // 新片
      goodBoxList: [], // 票房榜
      suggestList: [], // 搜索建议
      weeklyBox: [], // 口碑榜
      top250List: [], // top250
      searchHistory: this.getSearchHistory().slice(0),
      boxLastDate: "",
      searchStr: "",
      isLoadingHotShow: true,
      isLoadingNewMovie: true,
      isLoadingGoodBox: true,
      isLoadingWeeklyBox: true,
      isLoadingTop250: true,
      isShowSuggestBox: false,
      isShowTipsPanel: true,
      isTopNavFixed: false,
    };

    getHotShowing({
      start: 0,
      count: 12,
    })
      .then(({ data }: any) => {
        let { subjects } = data;

        this.setState({
          hotShowList: subjects,
          isLoadingHotShow: false,
        });
      });

    getNew()
      .then(({ data }: any) => {
        let { subjects } = data;

        this.setState({
          newMovieList: subjects,
          isLoadingNewMovie: false,
        });
      });

    getGoodbox()
      .then(({ data }: any) => {
        let { subjects, date } = data;

        this.setState({
          boxLastDate: date,
          goodBoxList: subjects,
          isLoadingGoodBox: false,
        });
      });

    getWeeklyMovie()
      .then(({ data }: any) => {
        let { subjects } = data;

        this.setState({
          weeklyBox: subjects,
          isLoadingWeeklyBox: false,
        });
      });

    getTop250({
      count: 36,
    })
      .then(({ data }: any) => {
        let { subjects } = data;

        this.setState({
          top250List: subjects,
          isLoadingTop250: false,
        });
      });

    this.getSuggestionBySearch = this.getContentBySearchDebounce();
  }
  changeTopNavStyle = () => {

  }
  toggleSuggestList = (isShow: boolean) => {
    this.setState({
      isShowSuggestBox: isShow,
    });
  }
  getSearchHistory() {
    const KEY = "SEARCH_H";
    let cache = JSON.parse(localStorage.getItem(KEY) || "[]");
    return cache;
  }
  addSearchHistory(item: any) {
    const MAX_LEN_CACHE_SEARCH = 5;
    const KEY = "SEARCH_H";
    let cache = this.getSearchHistory().slice(0);

    let isExist = cache.some((c: any) => {
      return c.id === item.id;
    });

    if (!isExist) {
      cache.unshift(item);
      if (cache.length > MAX_LEN_CACHE_SEARCH) {
        cache.pop();
      }
      localStorage.setItem(KEY, JSON.stringify(cache));
    }
  }
  getContentBySearchDebounce() {
    let comp = this;
    return _.debounce(function (value) {
      getContentBySearch(value, {
        count: 5,
      })
        .then(({ data }: any) => {
          let { subjects } = data;
          comp.setState({
            suggestList: subjects,
          });
        });
    }, 5e2);
  }
  getSearch = (ev: any) => {
    let value = ev.target.value;
    let str = value.trim();
    let isValid = str.length > 0;
    this.setState({
      searchStr: value,
      isShowTipsPanel: !isValid,
    });


    // close showlist
    isValid && this.getSuggestionBySearch(str);

  }
  renderTop250() {
    let { top250List } = this.state as any;
    let len = top250List.length;
    let count = len / 9 | 0;
    let groupList = new Array(count).fill(0);

    groupList = groupList.map((item: any, index: number) => {
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
  render() {
    let {
      hotShowList,
      newMovieList,
      goodBoxList,
      boxLastDate,
      suggestList,
      weeklyBox,
      searchHistory,
      searchStr,
      isLoadingHotShow,
      isLoadingNewMovie,
      isLoadingGoodBox,
      isLoadingWeeklyBox,
      isLoadingTop250,
      isShowTipsPanel,
      isShowSuggestBox,
      isTopNavFixed,
    }: any = this.state;

    // temp
    let bannerList = [
      imgBanner001,
      imgBanner002,
      imgBanner003,
      imgBanner004,
      imgBanner005
    ];

    return (
      <div onClick={ev => { this.toggleSuggestList(false) }}>
        <div className="header">
          <Affix onChange={(isFixed: any) => {
            this.setState({
              isTopNavFixed: !!isFixed,
            });
          }}>
            <div className={["header-bar", isTopNavFixed ? "head-bar--fixed" : ""].join(" ")}>
              <div className="bar-container clearfix">
                <div className="logo"></div>
                <div className="search">
                  <div className="search-box">
                    <div className="search-btn">
                      <Icon type="search" />
                      <span>全网搜</span>
                    </div>
                    <input className="search-input" placeholder="王牌对王牌 第4季"
                      value={searchStr}
                      onChange={this.getSearch}
                      onClick={ev => ev.stopPropagation()}
                      onFocus={this.toggleSuggestList.bind(this, true)} />
                  </div>
                  <div className="search-list" style={
                    {
                      "display": isShowSuggestBox ? "block" : "none",
                    }
                  }>
                    {
                      isShowTipsPanel ?
                        <div>
                          <div className="list-history" style={
                            {
                              "display": searchHistory.length > 0 ? "block" : "none",
                            }
                          }>
                            <h4 className="panel-title">历史记录</h4>
                            <ul>
                              {
                                searchHistory.map((item: any, index: number) => {
                                  return (
                                    <li className="list-item" key={index}>
                                      <Link to={`/detail/${item.id}`}>
                                        <h5 className="title">{item.title}</h5>
                                      </Link>
                                    </li>
                                  );
                                })
                              }
                            </ul>
                          </div>
                          <div className="list-hot">
                            <h4 className="panel-title">热映</h4>
                            <ul>
                              {
                                hotShowList.slice(0, 8).map((item: any, index: number) => {
                                  return (
                                    <li className="list-item" key={index}>
                                      <Link to={`/detail/${item.id}`}
                                        onClick={(ev: any) => {
                                          this.addSearchHistory({
                                            id: item.id,
                                            title: item.title,
                                          });
                                        }}>
                                        <span className="index">{+index + 1}</span>
                                        <span className="title">{item.title}</span>
                                      </Link>
                                    </li>
                                  );
                                })
                              }
                            </ul>
                          </div>
                        </div>
                        :
                        <div className="list-suggest">
                          <ul>
                            {
                              suggestList.map((item: any, index: number) => {
                                return (
                                  <li className="list-item" key={index}>
                                    <Link to={`/detail/${item.id}`}
                                      onClick={(ev: any) => {
                                        this.addSearchHistory({
                                          id: item.id,
                                          title: item.title,
                                        });
                                      }}>
                                      <h5 className="title">{item.title}</h5>
                                      <p className="origin_title">{item.original_title}</p>
                                    </Link>
                                  </li>
                                );
                              })
                            }
                          </ul>
                        </div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </Affix>
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
                this.renderTop250()
            }
          </div>
        </div>
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
      </div>
    );
  }
}

export default Home;
