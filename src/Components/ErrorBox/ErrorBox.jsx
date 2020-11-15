import React from 'react'

import "./errorBox.css"

function ErrorBox({errorMessage}) {
    return (
        <div id="errorMessage-container">
            <section>{errorMessage}</section>
        </div>
    )
}

export default ErrorBox
