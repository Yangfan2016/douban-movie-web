import React from "react";
import {
  Icon,
  Affix,
} from 'antd';
import {
  getHotShowing,
  getContentBySearch,
} from "../api";
import { Link } from 'react-router-dom';
import '../css/Home.css';
import * as _ from "lodash";



class TopNav extends React.Component<any> {
  getSuggestionBySearch: (value: string) => any
  state: any
  constructor(props: any) {
    super(props);
    this.state = {
      hotShowList: [], // 热映
      suggestList: [], // 搜索建议
      searchHistory: this.getSearchHistory().slice(0),
      searchStr: "",
      isShowSuggestBox: props.showSuggest,
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

    this.getSuggestionBySearch = this.getContentBySearchDebounce();
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
  componentWillReceiveProps(nextProps: any) {
    if (nextProps.showSuggest !== this.state.showSuggest) {
      this.setState({
        isShowSuggestBox: nextProps.showSuggest,
      });
    }
  }
  render() {
    let {
      hotShowList,
      suggestList,
      searchHistory,
      searchStr,
      isShowTipsPanel,
      isShowSuggestBox,
      isTopNavFixed,
    }: any = this.state;

    return (
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
                  onClick={ev => {
                    ev.stopPropagation();
                    this.toggleSuggestList(true);
                  }} />
              </div>
              <div className="search-list" style={
                {
                  "display": isShowSuggestBox ? "block" : "none",
                }
              }
                onClick={ev => ev.stopPropagation()}>
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
    );
  }
}

export default TopNav;
