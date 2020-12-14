import React, { useEffect, useRef, useState } from 'react'
import "./uploadPosts.css"

import ImageUploader from '../ImageUploader/ImageUploader'
import MessageBox from '../MessageBox/MessageBox'

import { useDatabase } from '../../Context/DataBase'


function UploadPosts() {
    const { insertIntoDB } = useDatabase()

    const [imageURL, setImageURL] = useState("")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState({
        display: false,
        errorMessage: ""
    })
    const [previewImage, setPreviewImage] = useState(null)
    const [uploadPost, setUploadPost] = useState(false)
    const fileInput = useRef(null)
    const uploadButton = useRef(null)
    const mounted = useRef(true)
    
    const handlePostUpload = () => {
        setUploadPost(true)
        uploadButton.current.click()
    }

    useEffect(() => {
        if(mounted.current){
            if(uploadPost){
            const uploadPostFunction = async () => {
                    try{
                        if(imageURL === "") throw {message: "Empty Input"}
                        console.log(previewImage)
                        if(previewImage === "wrongInput") throw {message: "Bad Input! Only PNG and JPEG is supported."}
                        setLoading(true)
                        await insertIntoDB(imageURL)
                        setLoading(false)
                        setPreviewImage(false)
                    }catch(e){
                        setLoading(false)
                        console.log(e)
                        setError({
                            display: true,
                            errorMessage: e.message || "Error Uploadinng"
                        })          
                    } 
                
                }
                uploadPostFunction()
                setUploadPost(false)
            }
    }
// eslint-disable-next-line
    }, [imageURL, insertIntoDB])


    useEffect(() => {
        if(previewImage === "wrongInput" ){
            setPreviewImage(null)
            setError({
                display: true,
                errorMessage: "Bad Input! Only PNG and JPEG is supported"
            })
        } else if(previewImage) {
            setError({
                display: false,
                errorMessage: ""
            })
        }
    }, [previewImage])


    //Just For CleanUp 
    useEffect(() => {
        return () => mounted.current = false
    }, [])

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
