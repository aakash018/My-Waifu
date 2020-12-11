import React, { useEffect, useRef, useState } from 'react'
import "./uploadPosts.css"

import ImageUploader from '../ImageUploader/ImageUploader'
import { useDatabase } from '../../Context/DataBase'
import MessageBox from '../MessageBox/MessageBox'



function UploadPosts() {

    const { insertIntoDB } = useDatabase()

    const [imageURL, setImageURL] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        display: false,
        errorMessage: ""
    })
    const [previewImage, setPreviewImage] = useState(null)

    const fileInput = useRef(null)
    const uploadButton = useRef(null)
    
    const handlePostUpload = () => {
        uploadButton.current.click()
    }

    useEffect(() => {
        const uploadPost = async () => {
            if(imageURL !== "") {
                setLoading(true)
                await insertIntoDB(imageURL)
                setLoading(false)
                setPreviewImage(false)
            }
        }
        uploadPost()
// eslint-disable-next-line
    }, [imageURL, insertIntoDB])

    return (
        <div id="upload-post">
            {error.display && <MessageBox type="error" message={error.errorMessage}/>}
            <ImageUploader
             imageURLState={setImageURL}
             previewImgState={setPreviewImage}
             isProfilePicture={false}
             fileInput={fileInput}
             uploadButton={uploadButton}
             style={{display: "none"}}
             /> 
             <section className="upload-post-intraction">
                <button onClick={() => fileInput.current.click()} disabled={loading}>Choose</button>
                {previewImage && <button onClick={handlePostUpload} disabled={loading}>Upload</button>}
                {previewImage && <button onClick={() => setPreviewImage(null)} >Cancle</button>}
            </section>
            
            <section className="preview-uploaded-image">
            {previewImage && <img src={previewImage} alt="preview-uploaded"/>}
            </section>
            
        </div>
    )
}

export default UploadPosts
