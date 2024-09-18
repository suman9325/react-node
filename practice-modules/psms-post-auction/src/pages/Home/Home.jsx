import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Home(props)
{


    return (
        <>
            <div className='page-wrapper'>

                <div className='ng-star-inserted'>
                    <div className="page-background"></div>
                    <div className='container login-wrap'>
                        <Outlet />
                    </div>
                </div>


            </div>
        </>
    )
}
