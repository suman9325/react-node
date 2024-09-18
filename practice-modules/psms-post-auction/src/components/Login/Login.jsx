import { useNavigate } from 'react-router-dom';
import loginThumbnail from '../../assets/images/login-img.png';
import './Login.css';
import { useState } from 'react';
import Error from '../Message/Error';

export default function Login()
{
    const navigate = useNavigate();

    const handleLogin = (type) =>
    {
        if (type === "bidder")
        {
            navigate("Bidder")
        }
        else if (type === "admin")
        {
            navigate("Admin")
        }
        else if (type === "client")
        {
            navigate("Client")
        }
    }




    return (
        <>
            <div className='login-container'>
                <div className="left">
                    <div className="logo">
                        <img src="https://auctionv2-docs.metaljunction.com/mailImgaeCSS/logo_100.jpg" alt="Logo" />
                    </div>
                    <div className='img-wrap'>
                        <img src={loginThumbnail} alt="Login Thumbnail" />
                    </div>
                </div>
                <div className="right">
                    <div className='form-wrap'>
                        <div className='flex'>
                            <h4 className='width40'>Welcome to e-Auction platform</h4>
                        </div>
                        <div class="btn-group">
                            <button type="button" class="btn btn-danger">Login</button>
                            <button type="button" class="btn btn-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
                                <span class="visually-hidden">Toggle Dropdown</span>
                            </button>
                            <ul class="dropdown-menu">
                                <li><a href="javascript:void();" class="dropdown-item" onClick={() => handleLogin('bidder')}>Bidder</a></li>
                                <li><a href="javascript:void();" class="dropdown-item" onClick={() => handleLogin('admin')}>Admin</a></li>
                                <li><a href="javascript:void();" class="dropdown-item" onClick={() => handleLogin('client')}>Client</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
