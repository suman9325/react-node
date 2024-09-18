import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function DashBoardHome()
{

    const navigate = useNavigate();


    return (
        <>
            <h1>Welcome</h1>

            <button onClick={() =>
            {
                navigate('/Catalogue');
            }} className='btn btn-primary'>{`Catalogue >`}</button>
        </>
    )
}
