import React from "react";
import { Card, Col, Row, Divider } from 'antd';
import { getHotShowing, getNew, getTop250, getDetail } from "../api";
import { Link } from 'react-router-dom';

let IMG_LOADING = (
    <div className="loading-img-box">
        <img src="http://118.24.21.99:5000/static/media/loading.130d74ed.svg" alt="" />
    </div>
);
class Home extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            newMovieList: new Array(6).fill({
                images: {
                    small: 'http://118.24.21.99:5000/static/media/loading.130d74ed.svg',
                }
            }),
            isLoadingNewMovie: true,
        };
        getHotShowing()
            .then(({ data }) => {
                // 修改图片域名
                let { subjects } = data;

                this.setState({
                    newMovieList: subjects,
                    isLoadingNewMovie: false,
                });
            })
    }
    render() {
        let { newMovieList, isLoadingNewMovie } = (this.state as any);
        return (
            <>
                <div className="line-raw">
                    <h2 className="raw-title">新片榜</h2>
                </div>
                {newMovieList.map((item: any, index: number) => {
                    return (
                        <Card
                            key={index}
                            loading={isLoadingNewMovie}
                            className="new_movie-card"
                            hoverable
                            cover={
                                <Link to={`/detail/${item.id}`}>{isLoadingNewMovie ? IMG_LOADING : <img src={item.images.small} />}</Link>
                            }
                        >
                            <Card.Meta
                                title={item.title}
                                description="www.douban.com"
                            />
                        </Card>
                    );
                })}
            </>
        );
    }
}

export default Home;