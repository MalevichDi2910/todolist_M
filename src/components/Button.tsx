import React from 'react';

type ButtonType = {
    name: string
    callBack: () => void
    className?: string
}

export const Button = (props: ButtonType) => {

    const {name, callBack, className} = props

    const onClickHandler = () => {
        callBack()
    }

    return (
        <>
            <button onClick={onClickHandler} className={className}>{name}</button>
        </>
    )
}