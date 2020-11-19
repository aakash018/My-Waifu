import React, { useContext, useState } from 'react'

import {storage} from "../firebase/config"

const StorageContext = React.createContext()

export const useStorage = () => useContext(StorageContext)

export const StorageProvider = ({children}) => {

    // const storageRef = storage.ref()

    const uploadImage = (image) => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);

        uploadTask.on("state_changed",
        snapshot => {},
        error => {
            console.log(error)
        },
        () => {
            storage.ref("images")
            .child(image.name)
            .getDownloadURL().then(url => console.log(url))
        }
        )
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
