import React from 'react';
import {Navbar} from '../../components'
import{Outlet} from "react-router-dom"

const Layout = ()=> {
    return (
        <>
        <Navbar></Navbar>
        <Outlet></Outlet>
        </>
    )

}

export default Layout;