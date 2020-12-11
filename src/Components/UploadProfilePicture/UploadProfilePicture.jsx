import React, { useState, useRef, useEffect } from 'react'

import ImageUploader from '../ImageUploader/ImageUploader'
import MessageBox from '../MessageBox/MessageBox'

//Style
import "./profilePicture.css"

function UploadProfilePicture({setImageURL, uploadImageButton}) {

    // const [imageURL, setImageURL] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    const [error, setError] = useState({
        display: false,
        errorMessage: ""
    })
    
    const fileInput = useRef(null)

    useEffect(() => {
        if(imagePreview === "wrongInput"){
            setError({
                display:true,
                errorMessage: "Bad Input. Only PNG and JPEG is supported"
            })
            setImagePreview(null)
        } else if (typeof(imagePreview) === "string") {
            setError({
                display: false,
                errorMessage: ""
            })
        }
    },[imagePreview])
    return (
        <div>
            <ImageUploader 
            imageURLState={setImageURL} 
            previewImgState={setImagePreview} 
            fileInput={fileInput}
            uploadButton={uploadImageButton} 
            style={{display: "none"}} 
            isProfilePicture={true}
            />
            {error.display && <MessageBox type="error" message={error.errorMessage}/>}            
            <section id="profile-picture-uploader">
                {!imagePreview && <button onClick={() => fileInput.current.click()} >+</button>}
                {imagePreview && <img src={imagePreview} alt="Uploaded Preview"/>}
            </section>
            
            {imagePreview && <button onClick={() => fileInput.current.click()} >Change</button>}
        </div>
    )
}

export default UploadProfilePicture
