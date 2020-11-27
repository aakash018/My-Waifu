import React from 'react'

import UploadPosts from '../UploadPosts/UploadPosts'
import "./infoSection.css"
function InfoSection({ style }) {
    return (
        <div id="info-section-bar" style={style}>
            <UploadPosts />
        </div>
    )
}

export default InfoSection
