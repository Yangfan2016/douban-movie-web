import React from 'react';
import { Statistic, Skeleton } from 'antd';

export default function () {
  return (
    <div className="page page-detail">
      <div className="poster-box">
        <div className="profile">
          <div className="profile-rate">
            <div className="rate">
              <span className="units">0</span>
            </div>
            <Statistic
              title="评价人数"
              value="0"
              className="box" />
          </div>
          <div className="block profile-img-loading"></div>
          <div className="block profile-info">
            <Skeleton />
          </div>
          <div className="block profile-reviews">
            <Skeleton avatar paragraph={{ rows: 4 }} />
          </div>
        </div>
      </div>
    </div>
  );
}
