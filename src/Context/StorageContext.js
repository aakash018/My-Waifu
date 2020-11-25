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
            const url = await storage.ref("images")
            .child(image.name)
            .getDownloadURL()
            stateToSet(url)
        }
        )
        
    }

    const uploadBase64 = (image, stateToSet) => {
        const uploadTask = storage.ref(`profilePicture/${currentUser.displayName}`).putString(image, 'data_url');
        return uploadTask.on("state_changed",
        snapshot => {},
        error => {
            return console.log(error)
        },
        async () => {
            const url = await storage.ref("profilePicture")
            .child(currentUser.displayName)
            .getDownloadURL()
            stateToSet(url)
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
