import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Header(props)
{
    const navigate = useNavigate();
    const [user, setUser] = useState('');

    useEffect(() =>
    {
        const userProfile = JSON.parse(localStorage.getItem('user-profile'));

        if (userProfile != null)
        {
            const { useEmail } = userProfile;
            setUser(useEmail);
        }
        else
        {
            navigate('/');
        }
    }, [])

    const handleOnLogout = () =>
    {
        localStorage.clear();
        navigate('/');
    }


    return (
        <>
            <header className="top-header">
                <div className="top-section">
                    <div className="container d-flex">
                        <div className="top-head-wrap">
                            <div className="grouped lg-group">
                                <a className="navbar-brand">
                                    <div className="logo">
                                        <img tabIndex="0" width="90" height="45"
                                            src="https://auctionv2-docs.metaljunction.com/mailImgaeCSS/logo_100.jpg"
                                            alt="https://auctionv2-docs.metaljunction.com/mailImgaeCSS/logo_100.jpg" />

                                    </div>
                                </a>
                                <div className="location-details">
                                    <div className="form-group mb-0">

                                    </div>
                                </div>
                                <div className="search">
                                    <div className="input-group">
                                        <input type="text" className="form-control" placeholder="Search for auctions"
                                            aria-label="Recipient's username" aria-describedby="basic-addon2" />


                                        <div className="input-group-append">
                                            <lib-button type="button" className="btn btn-link btn-sm">
                                                <i className="icon icon-search" style={{ float: "right", marginRight: "5px" }}></i>
                                            </lib-button>
                                        </div>
                                    </div>

                                </div>
                                <div className="ip-address">
                                    <div>IP: &nbsp;157.35.1.153</div>
                                    <div> 31/07/2024&nbsp;&nbsp;|&nbsp;&nbsp;16:04:28 </div>
                                </div>
                            </div>
                            <div className="grouped right-nav-group justify-content-end">
                                <div className="language ng-star-inserted">

                                    <div className="user-profile custom-dropdown dropdown" style={{ width: "55px" }}>
                                        <button type="button" id="dropdownBasic1"
                                            className="dropdown-toggle btn btn-link text-transform-none" aria-expanded="false"
                                            style={{ display: "flex" }}>
                                            <span>EN</span>
                                            <i className="icon icon-grater-than"></i>
                                        </button>
                                    </div>
                                </div>
                                <div className="separator">
                                    <i className="icon icon-calendar2"></i>
                                    <i className="icon icon-mail"></i>
                                    <div className="notifications custom-dropdown unread dropdown">
                                        <button className="dropdown-toggle btn btn-link">
                                            <span className="icon icon-bell m-0"></span>
                                            <span className="badge ng-star-inserted">3</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="post-login">
                                    <div className="user-profile custom-dropdown dropdown">
                                        <i className="icon icon-profile"></i>
                                        {/* <button type="button" id="dropdownBasic1"
                                            className="dropdown-toggle btn btn-link text-transform-none" aria-expanded="false"
                                            style={{ display: "flex" }}>
                                            <span>{user}</span>
                                            <i className="icon icon-grater-than"></i>
                                        </button> */}
                                        <div class="dropdown">
                                            {/* <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"> */}
                                            <button class="btn btn-link text-transform-none dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                {user}
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#">Setting</a></li>
                                                <li><a class="dropdown-item" href="#">Profile</a></li>
                                                <li><hr class="dropdown-divider" /></li>
                                                <li>
                                                    <button onClick={handleOnLogout} className='btn btn-warning-outline btn-sm'>Logout</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </>
    )
}
