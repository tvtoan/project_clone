import React from "react";
import VideoList from "../components/Video/VideoList";
import Layout from "../../src/components/Layout/Layout";
import Sidebar from "../../src/components/Shared/Sidebar";
import styles from './Video.module.scss';
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const VideoPage = () => {
  return (
    <Layout>
      <div className={cx('container')}>
        <div className={cx('left-column')}>
          <Sidebar />
        </div>

        <div className={cx('right-column')}>
          <VideoList />
        </div>
      </div>
    </Layout>
  );
};

export default VideoPage;
