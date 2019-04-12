import React from "react";
import { Card } from 'antd';
import { getHotShowing } from "../api";
import { Link } from 'react-router-dom';


function CardComp(props: any) {
    let { isLoading, data } = props;

    if (isLoading) {
        return (
            <Card
                loading={true}
                className="new_movie-card"
                hoverable
                cover={
                    <div className="loading-img-box">
                        <img src="http://118.24.21.99:5000/static/media/loading.130d74ed.svg" alt="" />
                    </div>
                }
            />
        );
    }

    return (
        <Card
            className="new_movie-card"
            hoverable
            cover={
                <Link to={`/detail/${data.id}`}><img src={data.images.small} /></Link>
            }
        >
            <Card.Meta
                title={data.title}
                description="www.douban.com"
            />
        </Card>
    );
}

class Home extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            newMovieList: new Array(6).fill(1),
            isLoadingNewMovie: true,
        };
        getHotShowing()
            .then(({ data }) => {
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
            <div className="page page-home">
                <div className="line-raw">
                    <h2 className="raw-title">新片榜</h2>
                </div>
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
        );
    }
}

export default Home;