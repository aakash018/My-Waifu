import React, { useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import UploadProfilePicture from '../../Components/UploadProfilePicture/UploadProfilePicture'
import { useAuth } from '../../Context/AuthContext'

function UpdateProfilePicture() {

    const [imageURL, setImageURL] = useState("")
    const [uploadImage, setUploadImage] = useState(false)

    const {currentUser} = useAuth()
    const uploadImageButton = useRef(null)

    const history = useHistory()

    useEffect(() => {
        const uploadIt = async () => {
        if(uploadImage){
            console.log(imageURL)
        await currentUser.updateProfile({
            photoURL: imageURL
        })
        history.push("/")
        }
    }
    setUploadImage(false)
    uploadIt()        
    }, [imageURL])


    const handleUploadPicture = async () => {
        uploadImageButton.current.click()
        setUploadImage(true)
    }

    return (
        <div>
            {console.log(currentUser)}
            <UploadProfilePicture setImageURL={setImageURL} uploadImageButton={uploadImageButton}/>
            {imageURL}
            <button onClick={() => handleUploadPicture()}>Upload</button>
        </div>
    )
}

export default UpdateProfilePicture
