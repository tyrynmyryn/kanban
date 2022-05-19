import React from 'react';
import { Outlet } from 'react-router-dom';
import './Layout.scss'

const Layout = () => {
    return (
        <div className="container">
            <Outlet />
        </div>
    );
};

export default Layout;