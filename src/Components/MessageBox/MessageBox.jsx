import React from 'react'

import "./messageBox.css"
function MessageBox({message, type}) {

    const style = {
        backgroundColor: type === "message"? "rgb(46, 194, 107)" : " rgb(235, 76, 102)" 
    }

    return (
        <div id="message-box-container" style={style}>
            {message}
        </div>
    )
}

export default MessageBox

