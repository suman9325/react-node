import React, { useState } from 'react'

export default function ButtonWithLoader({ children, style, onClick, isLoading }) {

    return (
        <>
            <button onClick={onClick} className={style} disabled={isLoading}>
                {
                    isLoading ? <span className="spinner-border spinner-border-sm" aria-hidden="true"></span> :
                        children
                }
            </button>
        </>
    )
}
