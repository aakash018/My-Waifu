import React from 'react'

import ImageUploader from "../ImageUploader/ImageUploader"
import "./infoSection.css"
function InfoSection({ style }) {
    return (
        <div id="info-section-bar" style={style}>
            <ImageUploader />
        </div>
    )
}

export default InfoSection
