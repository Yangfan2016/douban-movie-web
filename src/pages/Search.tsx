import React from 'react';

import { Link } from 'react-router-dom';


import { ListSkeleton } from '../skeletons/Home';

import TopNav from '../components/TopNav';
import Footer from '../components/Footer';


import { getContentBySearch, getHotShowing } from '../api';
import { reSerialize } from '../utils';

import { List, Pagination, Affix, Tag } from 'antd';

import '../css/Search.css';

class Search extends React.Component {
  constructor(props: any) {
    super(props);

    let { location } = props;
    let { search } = location;
    search = search.slice(1); // ?q=123 -> q=123
    let query: any = reSerialize(search);
    let searchStr = query.q;

    this.state = {
      searchStr,
      searchData: {},
      searchPageSize: 5,
      hotShowList: [],
      isLoadingSearchList: true,
      isLoadingHotShow: true,
    };


    this.changeSearchData(1);


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


  }
  changeSearchData = (current: number) => {
    let { searchStr, searchPageSize }: any = this.state;
    getContentBySearch(searchStr, {
      count: searchPageSize,
      start: (current - 1) * searchPageSize,
    })
      .then(({ data }: any) => {
        this.setState({
          searchData: data,
        });
      });
  }
  componentWillReceiveProps(newProps: any) {
    let search = newProps.location.search;
    let oldSearch = (this.props as any).location.search;
    if (search !== oldSearch) {
      search = search.slice(1); // ?q=123 -> q=123
      let query: any = reSerialize(search);
      let searchStr = query.q;

      this.setState({
        searchStr,
      }, () => {
        this.changeSearchData(1);
      });
    }
  }
  render() {
    let {
      searchData,
      hotShowList,
      isLoadingHotShow,
    }: any = this.state;
    return (
      <div>
        <div className="header clearfix">
          <TopNav />
        </div>
        <div className="page page-search">
          <div className="search-result-list">
            <List
              itemLayout="vertical"
              size="small"
              dataSource={searchData.subjects}
              renderItem={(item: any, index: number) => {
                let { images, title, id } = item;
                return (
                  <List.Item
                    className="list-item"
                    key={id}>
                    <List.Item.Meta
                      avatar={
                        <Link to={`/detail/${id}`}>
                          <img alt="logo" className="item-img" src={images.medium} />
                        </Link>}
                      title={title}
                      description={
                        <div className="desc">
                          {item.directors.length > 0 &&
                            <div className="directors">
                              <label>导演：</label>
                              {
                                item.directors.map((item: any, index: number) => {
                                  return <a key={index} className="person">{item.name}</a>
                                })
                              }
                            </div>
                          }
                          {item.casts.length > 0 &&
                            <div className="actors">
                              <label>演员：</label>
                              {
                                item.casts.map((item: any, index: number) => {
                                  let split = "";
                                  if (index !== 0) {
                                    split = "/";
                                  }
                                  return (
                                    <span key={index}>
                                      {split}
                                      <a className="person">{item.name}</a>
                                    </span>
                                  );
                                })
                              }
                            </div>
                          }
                          {item.genres.length > 0 &&
                            <div className="tags">
                              <label>标签：</label>
                              {
                                item.genres.map((tag: string, index: number) => {
                                  let split = "";
                                  if (index !== 0) {
                                    split = "/";
                                  }
                                  return (
                                    <span key={index}>
                                      {split}
                                      <a className="person">{tag}</a>
                                    </span>
                                  );
                                })
                              }
                            </div>
                          }
                        </div>
                      }
                    />
                  </List.Item>
                )
              }} />
            <Pagination onChange={this.changeSearchData} total={searchData.total} />
          </div>
          <Affix offsetTop={100} className="rate-box">
            <div>
              <div className="line-raw">
                <h2 className="raw-title">热映榜</h2>
              </div>
              <ul className="goodbox">
                {
                  isLoadingHotShow ?
                    <ListSkeleton row={2} /> :
                    hotShowList.map((item: any, index: number) => {
                      let { id, title, rating } = item;
                      let { average } = rating;
                      return (
                        <li className="goodbox-rate" key={index}>
                          <Link to={`/detail/${id}`}>
                            <h3 className="title">{title}</h3>
                            <span className="rank">{index + 1}</span>
                            <span className="box">{average} 分</span>
                          </Link>
                        </li>
                      );
                    })
                }
              </ul>
            </div>
          </Affix>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
