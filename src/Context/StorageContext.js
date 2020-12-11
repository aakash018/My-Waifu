import React, { useContext, useState } from 'react'

import {storage} from "../firebase/config"
import {useAuth} from "../Context/AuthContext"

const StorageContext = React.createContext()

export const useStorage = () => useContext(StorageContext)

export const StorageProvider = ({children}) => {

    const { currentUser } = useAuth()

    const uploadImage = (image, stateToSet) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        return uploadTask.on("state_changed",
        snapshot => {},
        error => {
            return console.log(error)
        },
        async () => {
            try{
            const url = await storage.ref("images")
            .child(image.name)
            .getDownloadURL()
            stateToSet(url)
            } catch (e) {
                console.log("Error Uploading Post" + e)
            }
        }
        )
        
    }

    const uploadBase64 = (image, stateToSet) => {
        const imageDynamicName = `${currentUser.displayName}-${Date.now()}`
        const uploadTask = storage.ref(`profilePicture/${imageDynamicName}`).putString(image, 'data_url');
        uploadTask.on("state_changed",
        snapshot => {},
        error => {
            return console.log(error)
        },
        async () => {
            try {
            const url = await storage.ref("profilePicture")
                                    .child(imageDynamicName)
                                    .getDownloadURL()
            stateToSet(url)
            } catch (e) {
                console.log("Error Uploading ProfilePicture" , e)
            }
        }
        )
         
    }

    // const getImages = () => {
        
    // }

    const value = {
        uploadImage,
        uploadBase64
    } 

    return (
       <StorageContext.Provider value={value}>
           {children}
       </StorageContext.Provider>
    )
}
