import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function LoginHomeButton()
{

    const navigate = useNavigate();

    const handleOnClick = () =>
    {
        navigate("/")
    }

    return (
        <>
            <div onClick={handleOnClick} className='right-top' style={{ width: "5%" }}>
                <span className='icon icon-home'></span>
            </div>
        </>
    )
}
