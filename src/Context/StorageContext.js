import React, { useContext, useState } from 'react'

import {storage} from "../firebase/config"

const StorageContext = React.createContext()

export const useStorage = () => useContext(StorageContext)

export const StorageProvider = ({children}) => {

    // const storageRef = storage.ref()

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

    const getImages = () => {
        
    }

    const value = {
        uploadImage,
    } 

    return (
       <StorageContext.Provider value={value}>
           {children}
       </StorageContext.Provider>
    )
}
