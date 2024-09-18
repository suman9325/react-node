import React from 'react'
import loginThumbnail from '../../../assets/images/login-img.png';
import LoginHomeButton from '../LoginHomeButton';

export default function ClientLogin()
{


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
                        <div>
                            <div>
                                <div className='flex'>
                                    <h4 className='width40'>Welcome to e-Auction platform</h4>
                                    <LoginHomeButton />
                                </div>
                                <h2>Client Login</h2>
                                {/* {!islogin && <Error message={message} />} */}
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="username" className='form-label'>UserName
                                            <span className='asterisk'> *</span>
                                        </label>
                                        <input name="UserName" type="text" id="UserName" placeholder='AD Credential' className='form-control' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className='form-label'>Password
                                            <span className='asterisk'> *</span>
                                        </label>
                                        <input type="password" id="Password" name="Password" placeholder='Enter Password' className='form-control' />
                                        <a href="" className='link mt-2 text-transform-none' style={{ fontWeight: "bold" }}>Forgot password?</a>
                                    </div>
                                    <button className='btn btn-primary w-100'>Login</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
