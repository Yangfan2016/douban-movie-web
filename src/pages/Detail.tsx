import React from "react";
import { getDetail } from '../api';
import { Tag, Statistic, Comment, Avatar, Tooltip, Rate, Icon } from 'antd';
import moment from 'moment';

class Detail extends React.Component {
    galleryBox: any
    constructor(props: any) {
        super(props);

        let { params } = props.match;

        this.state = {
            detailData: {},
        };

        getDetail(params.id)
            .then(({ data }: any) => {
                // 处理下数据
                let average = data.rating.average;
                let [$units, $decimal] = ("" + average).split(".");

                data.$units = $units || 0;
                data.$decimal = $decimal || 0;
                this.setState({
                    detailData: data,
                }, () => {
                    // BUG 需要等待所有图片加载完，才能获取到宽度
                    let id = setTimeout(() => {
                        clearTimeout(id);
                        this.reCalcGalleryBoxWidth();
                    }, 3e3);
                });
            })
    }
    reCalcGalleryBoxWidth() {
        // 重新计算图片画廊的宽度
        if (!this.galleryBox) return;
        let galleryBoxEl: HTMLElement | null = this.galleryBox;
        if (galleryBoxEl) {
            let width = 0;
            Array.from(galleryBoxEl.children).map((child: Element) => {
                let w = +(getComputedStyle(child).width || '0').replace("px", "");
                w = Math.ceil(w);
                width += w;
            });
            galleryBoxEl.style.width = `${width}px`;
        }
    }
    render() {
        let { detailData }: any = this.state;
        if (!detailData.id) return '';
        return (
            <div className="page page-detail">
                <div className="poster-box">
                    <div className="profile">
                        <div className="profile-rate">
                            <div className="rate">
                                <span className="units">{detailData.$units}.</span>
                                <span className="decimal">{detailData.$decimal}</span>
                            </div>
                            <Statistic
                                title="评价人数"
                                value={detailData.ratings_count}
                                className="box" />
                        </div>
                        <div className="block profile-img">
                            <img src={detailData.images.small} alt="" />
                        </div>
                        <div className="block profile-info">
                            <h2 className="raw-title">{detailData.title}</h2>
                            <div className="tags">
                                {
                                    detailData.tags.map((tag: string, index: number) => {
                                        return <Tag color="#080" key={index}>{tag}</Tag>
                                    })
                                }
                            </div>
                            <div className="directors">
                                <label>导演：</label>
                                {
                                    detailData.directors.map((item: any, index: number) => {
                                        return <a key={index} className="person">{item.name}</a>
                                    })
                                }
                            </div>
                            <div className="actors">
                                <label>演员：</label>
                                {
                                    detailData.casts.map((item: any, index: number) => {
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
                            <div className="video_summary">
                                <p className="summary">{detailData.summary}</p>
                            </div>
                        </div>
                        <div className="block profile-photos">
                            <h2 className="raw-title">剧照（{detailData.photos_count}）</h2>
                            <div className="photos-box">
                                <div className="box-gallery" data-id={detailData.id} key={detailData.id} ref={current => this.galleryBox = current}>
                                    {
                                        detailData.photos.map((item: any, index: number) => {
                                            let { image, alt } = item;

                                            return (
                                                <div className="gallery-img" key={index}>
                                                    {index === 0 && detailData.trailer_urls.length>0 && (
                                                        <>
                                                            <Tag color="#f50" className="img-tag">预告片</Tag>
                                                            <Icon
                                                                type="play-circle"
                                                                theme="filled"
                                                                className="img-icon" />
                                                        </>
                                                    )}
                                                    <img src={image} alt={alt} />
                                                </div>
                                            );
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="block profile-reviews">
                            <h2 className="raw-title">影评（{detailData.reviews_count}）</h2>
                            {
                                detailData.popular_reviews.map((item: any, index: number) => {
                                    let {
                                        author,
                                        rating,
                                        title,
                                        summary,
                                        created_at,
                                    } = item;

                                    return (
                                        <Comment
                                            className="cutsom-ant-comment"
                                            key={index}
                                            author={(
                                                <>
                                                    <span>{author.name}</span>
                                                    <Rate
                                                        className="custom-ant-rate"
                                                        disabled
                                                        defaultValue={rating.value}
                                                        count={rating.max} />
                                                </>
                                            )}
                                            avatar={(
                                                <Avatar
                                                    src={author.avatar}
                                                    alt={author.alt}
                                                />
                                            )}
                                            content={(
                                                <>
                                                    <a>{title}</a>
                                                    <p>{summary}</p>
                                                </>
                                            )}
                                            datetime={(
                                                <Tooltip title={moment(created_at).format('YYYY-MM-DD HH:mm:ss')}>
                                                    <span>{moment(created_at).fromNow()}</span>
                                                </Tooltip>
                                            )}
                                        />
                                    );
                                })
                            }
                        </div>
                        <div className="block profile-comments">
                            <h2 className="raw-title">热评（{detailData.comments_count}）</h2>
                            {
                                detailData.popular_comments.map((item: any, index: number) => {
                                    let {
                                        author,
                                        rating,
                                        content,
                                        created_at,
                                        useful_count,
                                        useless_count,
                                    } = item;

                                    const actions = [
                                        <span>
                                            <Tooltip title="Like">
                                                <Icon
                                                    type="like"
                                                    theme='filled'
                                                />
                                            </Tooltip>
                                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                                {useful_count || 0}
                                            </span>
                                        </span>,
                                        <span>
                                            <Tooltip title="Dislike">
                                                <Icon
                                                    type="dislike"
                                                    theme='outlined'
                                                />
                                            </Tooltip>
                                            <span style={{ paddingLeft: 8, cursor: 'auto' }}>
                                                {useless_count || 0}
                                            </span>
                                        </span>
                                    ];

                                    return (
                                        <Comment
                                            className="cutsom-ant-comment"
                                            key={index}
                                            actions={actions}
                                            author={(
                                                <>
                                                    <span>{author.name}</span>
                                                    <Rate
                                                        className="custom-ant-rate"
                                                        disabled
                                                        defaultValue={rating.value}
                                                        count={rating.max} />
                                                </>
                                            )}
                                            avatar={(
                                                <Avatar
                                                    src={author.avatar}
                                                    alt={author.alt}
                                                />
                                            )}
                                            content={(
                                                <p>{content}</p>
                                            )}
                                            datetime={(
                                                <Tooltip title={moment(created_at).format('YYYY-MM-DD HH:mm:ss')}>
                                                    <span>{moment(created_at).fromNow()}</span>
                                                </Tooltip>
                                            )}
                                        />
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Detail;