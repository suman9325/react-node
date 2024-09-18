import React from 'react'
import Header from '../../components/Header/Header'
import { Outlet } from 'react-router-dom'

export default function DashBoard(props)
{


    return (
        <>
            <Header></Header>
            <div className="container">
                <div className="page-wrapper">
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    )
}
