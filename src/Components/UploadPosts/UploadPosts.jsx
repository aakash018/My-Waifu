import React, { useEffect, useRef, useState } from 'react'
import "./uploadPosts.css"

import ImageUploader from '../ImageUploader/ImageUploader'
import { useDatabase } from '../../Context/DataBase'



function UploadPosts() {

    const { insertIntoDB } = useDatabase()

    const [imageURL, setImageURL] = useState("")

    // const [uploadPost, setUploadPost] = useState(false)
    const [previewImage, setPreviewImage] = useState(null)

    const fileInput = useRef(null)
    const uploadButton = useRef(null)
    
    const handlePostUpload = () => {
        uploadButton.current.click()
        // setUploadPost(true)
    }

    useEffect(() => {
        console.log("img" + " " + imageURL)
        if(imageURL !== "") {
            console.log(1111)
            insertIntoDB(imageURL)
            // setUploadPost(false)
        }
    }, [imageURL, insertIntoDB])

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
                <button onClick={handlePostUpload} >Upload</button>
                {previewImage && <button onClick={() => setPreviewImage(null)} >Cancle</button>}
            </section>
            
            <section className="preview-uploaded-image">
            {previewImage && <img src={previewImage} alt="preview-uploaded"/>}
            </section>
            
        </div>
    )
}

export default UploadPosts
