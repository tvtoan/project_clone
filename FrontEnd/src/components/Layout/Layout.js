import React from "react";
import styles from './Layout.module.scss';
import classNames from 'classnames/bind';

import Header from '../Shared/Header';
import Sidebar from "../Shared/Sidebar";


const cx = classNames.bind(styles)
const Layout = ({children}) => {
    return (
        <div className = {cx('layout')}>
            <Header />
            <div className = {cx('content')}>
                <Sidebar />
                <main className = {cx('main')}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default Layout;

