import React from 'react'


import "./mainbutton.css"
function MainButtons({text, type, onClick, disabled}) {
    return (
        <>
        {console.log(disabled)}
            <button type={type} className="main-button" onClick={onClick} disabled={disabled}>{disabled? "Loading" : text}</button>
        </>
    )
}

export default MainButtons
