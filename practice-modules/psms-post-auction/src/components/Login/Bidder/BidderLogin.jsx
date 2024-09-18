import { useNavigate } from 'react-router-dom';
import loginThumbnail from '../../../assets/images/login-img.png';
import '../Login.css';
import { useState } from 'react';
import Error from '../../Message/Error';
import LoginHomeButton from '../LoginHomeButton';
import ButtonWithLoader from '../../Buttons/ButtonWithLoader';
import { API_ENDPOINT_LOGIN } from '../../../ApiServices/ApiConstant';
import apiService from '../../../ApiServices/apiService';

export default function BidderLogin()
{
    const navigate = useNavigate();
    const [islogin, setIslogin] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = async (e) =>
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const obj = {}
        for (const [key, value] of formData.entries())
        {
            obj[key] = value;
        }

        try
        {
            setIslogin(true);
            const res = await apiService('POST', API_ENDPOINT_LOGIN.LOGIN_BIDDER, JSON.stringify(obj))

            let status = res.results.loginStatus;
            if (status === "success")
            {
                setIslogin(false)
                localStorage.setItem('user-profile', JSON.stringify(res.results));
                navigate('/dashboard');
            } else
            {
                setMessage(res.results);
                setIslogin(false)
            }
        }
        catch (err)
        {
            setMessage(err.message);
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
                        <div>
                            <div>
                                <div className='flex'>
                                    <h4 className='width40'>Welcome to e-Auction platform</h4>
                                    <LoginHomeButton />
                                </div>
                                <h2>Login</h2>

                                {message !== '' && <Error message={message} />}
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label htmlFor="username" className='form-label'>Login ID: <span className='asterisk'> *</span></label>
                                        <input type="text" name="LoginID" id="LoginID" placeholder='Enter User ID' className='form-control' autoComplete='off' />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password" className='form-label'>Password: <span className='asterisk'> *</span></label>
                                        <input type="password" name="Password" id="Password" placeholder='Enter Password' className='form-control' autoComplete='off' />
                                        <a href="" className='link mt-2 text-transform-none' style={{ fontWeight: "bold" }}>Forgot password?</a>
                                    </div>
                                    <div class="form-check mb-4">
                                        <input class="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                        <label class="form-check-label" for="flexCheckChecked">
                                            I agree to &nbsp;
                                            <a href="#">mjunction Terms and Conditions</a>
                                        </label>
                                    </div>
                                    <ButtonWithLoader isLoading={islogin} style={'btn btn-primary w-100'}>Login</ButtonWithLoader>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}