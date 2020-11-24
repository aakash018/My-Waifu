import React, { useState, useRef } from 'react'
import ImageUploader from '../ImageUploader/ImageUploader'

//Style
import "./profilePicture.css"

function UploadProfilePicture() {

    const [imageURL, setImageURL] = useState("")
    const [imagePreview, setImagePreview] = useState(null)
    
    const fileInput = useRef(null)


    return (
        <div>
            <ImageUploader 
            imageURLState={setImageURL} 
            previewImgState={setImagePreview} 
            fileInput={fileInput} 
            // style={{display: "none"}} 
            isProfilePicture={true}
            />
            {/* <button onClick={() => fileInput.current.click()}>Click</button> */}

            <section id="profile-picture-uploader">
                {!imagePreview && <button onClick={() => fileInput.current.click()} >+</button>}
                {imagePreview && <img src={imagePreview} alt="Uploaded Preview"/>}
            </section>
            {imageURL}
            {imagePreview && <button onClick={() => fileInput.current.click()} >Change</button>}
        </div>
    )
}

export default UploadProfilePicture
