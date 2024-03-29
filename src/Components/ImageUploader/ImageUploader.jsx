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
        if(uploadedFile === null || previewImgState === "wrongInput") {
            return imageURLState("empty")
        } else {
        uploadBase64(uploadedFile, imageURLState)
        }
    }
   
    const handlePostSubmit = () => {
        console.log(uploadedFile + " IMG")
        if(uploadedFile == null) {
            console.log("Yo Yo")
            return imageURLState("")
        } else {
            try {
            console.log("Yo")
        uploadImage(uploadedFile, imageURLState)
            } catch(e) {
                console.log(e)
            }
        }
    }

    const handleInputProfile = async (e) => {
        const file = e.target.files[0]
        if(file.type === "image/png" || file.type === "image/jpeg"){
            const image = await resizeFile(file, 300, 300)
            setUploadedFile(image)
            previewImgState(image)
        } else {
            return previewImgState("wrongInput")
        }
        
    }

    const handleInputPost = (e) => {
        const image = e.target.files[0]
        if(image.type === "image/png" || image.type === "image/jpeg" || image.type === "image/jpg"){
            const reader = new FileReader()
            reader.onload = e => {
                previewImgState(e.target.result)
            }
            setUploadedFile(image)
            reader.readAsDataURL(image)
        } else {
            previewImgState("wrongInput")
        }
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
