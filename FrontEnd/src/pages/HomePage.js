import React from "react";
import Sidebar from "../components/Shared/Sidebar";
import PostList from "../components/Post/PostList";
import StoryList from "../components/Story/StoryList";
import { useAuth } from "../context/AuthContext";
import Layout from "../components/Layout/Layout";

import styles from "./HomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

const HomePage = () => {
  const { user, loading } = useAuth();

  if (!user) {
    return <div>Please log in to access the home page.</div>;
  }
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout className = {cx('main-container')}>
      <div className={cx("container")}>
        <div className={cx("left-column")}>
          <div className={cx("sidebar-wrapper")}>
            <Sidebar />
          </div>
        </div>
        <div className={cx("middle-column")}>
          <div className={cx('storylist-wrapper')}>
           
            < StoryList />
          </div>
          <div className={cx("postlist-wrapper")}>
            <PostList />
          </div>
        </div>
        <div className={cx("right-column")}>
          <div>List friend</div>
        </div>
      </div>
    </Layout>
  );
  //
};

export default HomePage;
