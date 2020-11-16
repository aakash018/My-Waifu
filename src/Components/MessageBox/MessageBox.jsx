import React from 'react'

import "./messageBox.css"
function MessageBox({message}) {
    return (
        <div className="message-box-container">
            {message}
        </div>
    )
}

export default MessageBox
