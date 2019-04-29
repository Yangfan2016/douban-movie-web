import React from 'react';

import TopNav from '../components/TopNav';
import Footer from '../components/Footer';

import { getContentBySearch } from '../api';
import { reSerialize } from '../utils';

import { List } from 'antd';

import '../css/Search.css';

class Search extends React.Component {
  constructor(props: any) {
    super(props);

    this.state = {
      searchList: [],
      isLoadingSearchList: true,
    };

    let { location } = props;
    let { search } = location;
    search = search.slice(1); // ?q=123 -> q=123
    let query: any = reSerialize(search);
    let searchStr = query.q;

    getContentBySearch(searchStr, {
      count: 10,
    })
      .then(({ data }: any) => {
        let { subjects } = data;
        this.setState({
          searchList: subjects,
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

      getContentBySearch(searchStr, {
        count: 10,
      })
        .then(({ data }: any) => {
          let { subjects } = data;
          this.setState({
            searchList: subjects,
          });
        });
    }
  }
  render() {
    let {
      searchList,
    }: any = this.state;
    return (
      <div>
        <div className="header clearfix">
          <TopNav />
        </div>
        <div className="page page-search">
          <List
            className="search-result-list"
            itemLayout="vertical"
            size="small"
            dataSource={searchList}
            renderItem={(item: any, index: number) => {
              let { images, title, id } = item;
              return (
                <List.Item
                  className="list-item"
                  key={id}>
                  <List.Item.Meta
                    avatar={<img alt="logo" className="item-img" src={images.medium} />}
                    title={title}
                  />
                </List.Item>
              )
            }} />
        </div>
        <Footer />
      </div>
    );
  }
}

export default Search;
