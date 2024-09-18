import React, { useState } from 'react'

export default function ButtonWithLoader({ children, style, onClick, isLoading })
{

    return (
        <>
            <button onClick={onClick} class={style} disabled={isLoading}>
                {
                    isLoading ? <span class="spinner-border spinner-border-sm" aria-hidden="true"></span> :
                        children
                }
            </button>
        </>
    )
}
