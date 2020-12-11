import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

import MessageBox from "../../Components/MessageBox/MessageBox"
import UploadProfilePicture from '../../Components/UploadProfilePicture/UploadProfilePicture'

function UpdateProfilePicture() {

    const [imageURL, setImageURL] = useState("")
    const [uploadImage, setUploadImage] = useState(false)
    const [error, setError] = useState({
        display: false,
        errorMessage: ""
    })

    const {currentUser} = useAuth()
    const uploadImageButton = useRef(null)

    const history = useHistory()

    useEffect(() => {
        const uploadIt = async () => {
        if(uploadImage && imageURL !== ""){
            
            if(imageURL === "empty"){
                return setError({
                    display: true,
                    errorMessage: "Empty Input"
                })
            } else {
                setError({display: false, errorMessage: ""})
            try{
                await currentUser.updateProfile({
                photoURL: imageURL
                })
                history.push("/")
            }catch (e){
                setError({
                    display: true,
                    errorMessage: e.message
                })
            }
        }
        }
    }
    // setUploadImage(false)
    uploadIt()        
    }, [imageURL, currentUser, history, uploadImage])


    const handleUploadPicture = async () => {
        uploadImageButton.current.click()
        setUploadImage(true)
    }

    return (
        <div>
            {error.display && <MessageBox message={error.errorMessage} type={"error"}/>}
            <UploadProfilePicture setImageURL={setImageURL} uploadImageButton={uploadImageButton}/>
            <button onClick={() => handleUploadPicture()}>Upload</button>
        </div>
    )
}

export default UpdateProfilePicture
