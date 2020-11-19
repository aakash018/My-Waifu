import React, { useState } from 'react'
import { useStorage } from '../../../Context/StorageContext'

import "./imageUpload.css"
function ImageUploader({ style }) {

    const [uploadedFile, setUploadedFile] = useState({})

    const { uploadImage } = useStorage()

    const handleSubmit = (e) => {
        e.preventDefault()
        uploadImage(uploadedFile)
    }

    const handleInputChange = (e) => {
        setUploadedFile(e.target.files[0])
    }


    return (
        <div id="info-section-bar" style={style}>
            <form onSubmit={handleSubmit} >
                <input type="file" id="image-uploader" onChange={handleInputChange}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default ImageUploader
