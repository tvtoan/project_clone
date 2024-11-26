import React from "react";
import { Link } from "react-router-dom";
import styles from './Sidebar.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);
const Sidebar = () => {
    return (
        <aside className = {cx('sidebar')}>
            <ul>
                <li><Link to= "/home" className = {cx('link')}>Home</Link></li>
                <li><Link to= "/inbox/:id"  className = {cx('link')}>Inbox</Link></li>
                <li><Link to= "/stories/:id" className = {cx('link')}>Stories</Link></li>
                <li><Link to= "/video" className = {cx('link')}>Videos</Link></li>

            </ul>
        </aside>
    )
}

export default Sidebar;