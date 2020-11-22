import React, { useState } from 'react'
import ImageUploader from '../../Components/ImageUploader/ImageUploader'

function UploadProfilePicture() {

    const [imageURL, setImageURL] = useState("")
    const [imagePreview, setImagePreview] = useState("")
    // const [showUploadPopUp, setUploadPopup] = useState(false)
    return (
        <div>
            <ImageUploader imageURLState={setImageURL} previewImgState={setImagePreview}/>
            <img src={imagePreview} />
            <button> Click </button>
        </div>
    )
}

export default UploadProfilePicture
