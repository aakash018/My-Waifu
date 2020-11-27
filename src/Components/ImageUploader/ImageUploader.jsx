import React, { useState } from 'react'
import Resizer from 'react-image-file-resizer';

import { useStorage } from '../../Context/StorageContext'


import "./imageUpload.css"


const resizeFile = (file, width, height) => new Promise(resolve => {
    Resizer.imageFileResizer(file, width, height, 'JPEG', 100, 0,
    uri => {
      resolve(uri);
    },
    'base64'
    );
});



function ImageUploader({ style, imageURLState,previewImgState, fileInput, isProfilePicture, uploadButton }) {

    const [uploadedFile, setUploadedFile] = useState(null)

    const { uploadImage, uploadBase64 } = useStorage()

    const handleProfilePictureSubmit = () => {
        if(uploadedFile === null) {
            return imageURLState("empty")
        } else {
        uploadBase64(uploadedFile, imageURLState)
        }
    }

    const handlePostSubmit = () => {
        if(uploadedFile) {
            return imageURLState("")
        } else {
        uploadImage(uploadedFile, imageURLState)
        }
    }

    const handleInputProfile = async (e) => {
        const file = e.target.files[0]
        const image = await resizeFile(file, 300, 300)
        setUploadedFile(image)
        previewImgState(image)
    }

    const handleInputPost = (e) => {
        const image = e.target.files[0]
        const reader = new FileReader()
        reader.onload = e => {
            previewImgState(e.target.result)
        }
        setUploadedFile(image)
        reader.readAsDataURL(image)
     
    }

    return (
        <div id="image-uploader" style={style}>
            <form>
                <input 
                type="file" 
                id="image-uploader" 
                onChange={isProfilePicture? handleInputProfile: handleInputPost} 
                ref={fileInput}/>
                <button 
                type="button" 
                onClick={() => isProfilePicture? handleProfilePictureSubmit() : handlePostSubmit()} 
                ref={uploadButton}>
                    Upload
                </button>
            </form>
        </div>
    )
}

export default ImageUploader
