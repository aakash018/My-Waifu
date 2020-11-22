import React, { useRef, useState } from 'react'
import { useStorage } from '../../Context/StorageContext'

import "./imageUpload.css"
function ImageUploader({ style, showChooseFile, chooseFileState, upload, imageURLState,previewImgState }) {

    const [uploadedFile, setUploadedFile] = useState({})

    const { uploadImage } = useStorage()

    const fileInput = useRef(null)

    const handleSubmit = async (e) => {
        e.preventDefault()
        uploadImage(uploadedFile, imageURLState)
    }

    const handleInputChange = (e) => {
        setUploadedFile(e.target.files[0])
        
        const fileLoader = new FileReader()

        fileLoader.onload = e => {
            previewImgState(e.target.result)
        }

        fileLoader.readAsDataURL(e.target.files[0])

    }

    if(showChooseFile) {
        // fileInput.current.click()
        // chooseFileState(false)  
    }

    return (
        <div id="image-uploader" style={style}>
            <form onSubmit={handleSubmit} >
                <input type="file" id="image-uploader" onChange={handleInputChange} ref={fileInput}/>
                <button type="submit">Upload</button>
            </form>
        </div>
    )
}

export default ImageUploader
