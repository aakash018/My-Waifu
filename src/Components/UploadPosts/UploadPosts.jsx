import React, { useRef, useState } from 'react'
import "./uploadPosts.css"

import ImageUploader from '../ImageUploader/ImageUploader'



function UploadPosts() {

    const [imageURL, setImageURL] = useState("")
    const [previewImage, setPreviewImage] = useState(null)

    const fileInput = useRef(null)
    const uploadButton = useRef(null)

    return (
        <div id="upload-post">
            <ImageUploader
             imageURLState={setImageURL}
             previewImgState={setPreviewImage}
             isProfilePicture={false}
             fileInput={fileInput}
             uploadButton={uploadButton}
             style={{display: "none"}}
             /> 
             <section className="upload-post-intraction">
                <button onClick={() => fileInput.current.click()} >Choose</button>
                <button onClick={() => uploadButton.current.click()} >Upload</button>
                {previewImage && <button onClick={() => setPreviewImage(null)} >Cancle</button>}
            </section>
            <section className="preview-uploaded-image">
            {previewImage && <img src={previewImage} alt="preview-picture-uploaded"/>}
            </section>
            
        </div>
    )
}

export default UploadPosts
