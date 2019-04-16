import React from "react";
import { Card, Tag, Carousel, Input } from 'antd';
import { getHotShowing, getNew, getGoodbox } from "../api";
import { Link } from 'react-router-dom';
import { CardListSkeleton, ListSkeleton } from "../skeletons/Home";
import '../css/Home.css';

// temp
import imgBanner001 from '../assets/banner-001.jpg';
import imgBanner002 from '../assets/banner-002.jpg';
import imgBanner003 from '../assets/banner-003.jpg';
import imgBanner004 from '../assets/banner-004.jpg';
import imgBanner005 from '../assets/banner-005.jpg';


class Home extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hotShowList: [],
            newMovieList: [],
            goodBoxList: [],
            boxLastDate: "",
            isLoadingHotShow: true,
            isLoadingNewMovie: true,
            isLoadingGoodBox: true,
        };

        getHotShowing({
            start: 0,
            count: 12,
        })
            .then(({ data }:any) => {
                let { subjects } = data;

                this.setState({
                    hotShowList: subjects,
                    isLoadingHotShow: false,
                });
            });

        getNew()
            .then(({ data }:any) => {
                let { subjects } = data;

                this.setState({
                    newMovieList: subjects,
                    isLoadingNewMovie: false,
                });
            });

        getGoodbox()
            .then(({ data }:any) => {
                let { subjects, date } = data;

                this.setState({
                    boxLastDate: date,
                    goodBoxList: subjects,
                    isLoadingGoodBox: false,
                });
            });
    }
    render() {
        let {
            hotShowList,
            newMovieList,
            goodBoxList,
            boxLastDate,
            isLoadingHotShow,
            isLoadingNewMovie,
            isLoadingGoodBox,
        } = (this.state as any);

        // temp
        let bannerList = [
            imgBanner001,
            imgBanner002,
            imgBanner003,
            imgBanner004,
            imgBanner005
        ];

        return (
            <>
                <div className="header">
                    <div className="header-bar">
                        <div className="bar-container">
                            <div className="logo"></div>
                            <div className="search">
                                <Input.Search
                                    placeholder="王牌对王牌 第4季"
                                    onSearch={(value:string) => console.log(value)}
                                    style={{ width: 200 }} />
                            </div>
                        </div>
                    </div>
                    <div className="header-banner">
                        <Carousel effect="fade" autoplay>
                            {bannerList.map((item: any, index: number) => {
                                return (
                                    <div
                                        className="banner-item"
                                        key={index}>
                                        <img src={item} alt="" />
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
                                                        <Link to={`/detail/${item.id}`}><img src={item.images.small} /></Link>
                                                    }
                                                >
                                                    <Tag color="#f50" className="img-tag">{item.rating.average}</Tag>
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
                                                        <Link to={`/detail/${item.id}`}><img src={item.images.small} /></Link>
                                                    }
                                                >
                                                    <Tag color="#f50" className="img-tag">{item.rating.average}</Tag>
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
                </div>
            </>
        );
    }
}

export default Home;