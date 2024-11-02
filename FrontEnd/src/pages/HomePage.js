import React from 'react';
import styles from './HomePage.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const HomePage = () => {
    return(
        <div className= {cx('container')}>
            <div className={cx('feed')}>
                <h2 className={cx('title')}>News Feed</h2>
                {/* Render posts here */}
            </div>
            <div className={cx('rightSidebar')}>
                <h2 className={cx('title')}>Contacts</h2>
                {/* Render list friends here */}
            </div>
        </div>
        
    )
}

export default HomePage;