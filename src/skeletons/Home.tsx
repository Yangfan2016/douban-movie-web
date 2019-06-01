import React from 'react';
import { Card, Skeleton } from 'antd';
import loadingSvg from '../assets/loading.svg';

export function CardListSkeleton(props: ICardList) {
  let { column } = props;
  let list = new Array(column || 6).fill(1);
  return (
    <>
      {
        list.map((item: number, index: number) => {
          return (
            <div className="card-container" key={index}>
              <Card
                key={index}
                loading={true}
                className="movie-card"
                cover={
                  <div className="loading-img-box">
                    <img src={loadingSvg} alt="loading" />
                  </div>
                }
              />
            </div>
          );
        })
      }
    </>
  );
}

export function CardListTop250Skeleton() {
  let list = new Array(9).fill(1);
  return (
    <div className="cards-box cards-box--top250 clearfix">
      {
        list.map((item: number, index: number) => {
          return (
            <div className={["card-container", index === 0 ? "card-big" : ""].join(" ")} key={index}>
              <Card
                key={index}
                loading={true}
                className="movie-card"
                cover={
                  <div className="loading-img-box">
                    <img src={loadingSvg} alt="loading" />
                  </div>
                }
              />
            </div>
          );
        })
      }
    </div>
  );
}

export function ListSkeleton(props: IList) {
  let { row } = props;
  let list = new Array(row || 4).fill(1);
  return (
    <>
      {
        list.map((item: number, index: number) => {
          return (
            <li className="goodbox-rate" key={index}>
              <Skeleton className="title" paragraph={false} />
              <Skeleton className="summary" title={false} paragraph={{ rows: 1 }} />
              <span className="rank">0</span>
              <span className="box">0 万</span>
            </li>
          );
        })
      }
    </>
  );
}
