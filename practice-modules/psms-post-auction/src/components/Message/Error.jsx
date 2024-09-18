import React from 'react'
import style from './Error.module.css';

export default function Error({ message })
{


    return (
        <>
            <h3 className={style.error}>{message}</h3>
        </>
    )
}
