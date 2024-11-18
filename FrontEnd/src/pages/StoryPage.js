import React from "react";
import styles from './Story.module.scss';
import StoryList from "../components/Story/StoryList";
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const StoryPage = () => {
    return (
        <div className={cx('story-page')}>
            <h1 className={cx('title')}>Welcome to the Stories Page</h1>
            <StoryList />
        </div>
    );
};

export default StoryPage;
