import React from "react";
import { Card, Tag, Skeleton } from 'antd';
import { getHotShowing, getNew, getGoodbox } from "../api";
import { Link } from 'react-router-dom';
import loadingSvg from '../assets/loading.svg';

function CardComp(props: any) {
    let { isLoading, data } = props;

    if (isLoading) {
        return (
            <Card
                loading={true}
                className="movie-card"
                hoverable
                cover={
                    <div className="loading-img-box">
                        <img src={loadingSvg} alt="loading" />
                    </div>
                }
            />
        );
    }

    return (
        <Card
            className="movie-card"
            hoverable
            cover={
                <Link to={`/detail/${data.id}`}><img src={data.images.small} /></Link>
            }
        >
            <Tag color="#f50" className="img-tag">{data.rating.average}</Tag>
            <Card.Meta
                title={data.title}
                description={data.genres.join("/")}
            />
        </Card>
    );
}

function ListComp() {
    return (
        <li className="goodbox-rate">
            <Skeleton className="title" paragraph={false} />
            <Skeleton className="summary" title={false} paragraph={{rows:1}} />
            <span className="rank">0</span>
            <span className="box">0 万</span>
        </li>
    );
}

class Home extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            hotShowList: new Array(6).fill(1),
            newMovieList: new Array(4).fill(1),
            goodBoxList: new Array(2).fill(1),
            boxLastDate: "",
            isLoadingHotShow: true,
            isLoadingNewMovie: true,
            isLoadingGoodBox: true,
        };

        getHotShowing({
            start: 0,
            count: 12,
        })
            .then(({ data }) => {
                let { subjects } = data;

                this.setState({
                    hotShowList: subjects,
                    isLoadingHotShow: false,
                });
            });

        getNew()
            .then(({ data }) => {
                let { subjects } = data;

                this.setState({
                    newMovieList: subjects,
                    isLoadingNewMovie: false,
                });
            });

        getGoodbox()
            .then(({ data }) => {
                let { subjects, date } = data;

                this.setState({
                    boxLastDate: date,
                    goodBoxList: subjects.slice(0, 10),
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
        return (
            <div className="page page-home">
                <div className="block block-hotshow">
                    <div className="line-raw">
                        <h2 className="raw-title">正在热映</h2>
                    </div>
                    <div className="cards-box clearfix">
                        {hotShowList.map((item: any, index: number) => {
                            return (
                                <CardComp
                                    key={index}
                                    data={item}
                                    isLoading={isLoadingHotShow}
                                />
                            );
                        })}
                    </div>
                </div>
                <div className="block block-newmovie">
                    <div className="line-raw">
                        <h2 className="raw-title">新片榜</h2>
                    </div>
                    <div className="cards-box clearfix">
                        {newMovieList.map((item: any, index: number) => {
                            return (
                                <CardComp
                                    key={index}
                                    data={item}
                                    isLoading={isLoadingNewMovie}
                                />
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
                                goodBoxList.map((item: any, index: number) => {
                                    if (isLoadingGoodBox) {
                                        return <ListComp key={index} />;
                                    }

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
        );
    }
}

export default Home;