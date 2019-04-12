import React from "react";
import { getDetail } from '../api';
import { Tag } from 'antd';

class Detail extends React.Component {
    constructor(props: any) {
        super(props);

        let { params } = props.match;

        this.state = {
            detailData:{},
        };

        getDetail(params.id)
            .then(({ data }: any) => {
                // 处理下数据
                let average = data.rating.average;
                let [$units, $decimal] = average.split(".");

                data.$units = $units||0;
                data.$decimal = $decimal||0;
                this.setState({
                    detailData:data,
                });
            })
    }
    render() {
        let { detailData }: any = this.state;
        if (!detailData.id) return '';
        return (
            <div className="page page-detail">
                <div className="poster-box">
                    <div className="profile">
                        <div className="profile-img">
                            <img src={detailData.image} alt="" />
                        </div>
                        <div className="profile-info">
                            <h2 className="raw-title">{detailData.alt_title}</h2>
                            <div className="tags">
                                {
                                    detailData.tags.map((tag: any, index: number) => {
                                        return <Tag color="#080" key={index}>{tag.name}</Tag>
                                    })
                                }
                            </div>
                            <div className="director">
                                <label>导演：</label>
                                {
                                    detailData.attrs.director.map((name: string, index: number) => {
                                        return <a key={index} className="person">{name}</a>
                                    })
                                }
                            </div>
                            <div className="director">
                                <label>演员：</label>
                                {
                                    detailData.attrs.cast.slice(0, 4).map((name: string, index: number) => {
                                        let split = "";
                                        if (index !== 0) {
                                            split = "/";
                                        }
                                        return (
                                            <span key={index}>
                                                {split}
                                                <a className="person">{name}</a>
                                            </span>
                                        );
                                    })
                                }
                            </div>
                            <div className="video_summary">
                                <p className="summary">{detailData.summary}</p>
                            </div>
                        </div>
                        <div className="profile-rate">
                            <div className="rate">
                                <span className="units">{detailData.$units}.</span>
                                <span className="decimal">{detailData.$decimal}</span>
                            </div>
                            <h3 className="box">{detailData.rating.numRaters} 人评价</h3>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;