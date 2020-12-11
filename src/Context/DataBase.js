import React, { useContext } from 'react'

import { database as db} from "../firebase/config"
import {useAuth} from "../Context/AuthContext"

const DatabaseContext = React.createContext()
export const useDatabase = () => {
    return useContext(DatabaseContext)
}


function DataBase({children}) {
    const {currentUser} = useAuth()

    const insertIntoDB = async (data) => {

        const postPayLoad = {
            postIMG: data,
            postedBy: currentUser.displayName,
            postedTime: Date.now()
        }

       return db.collection("posts").add(postPayLoad)
    }

    const getPosts = (lastPosition) => {
        return db.collection("posts").orderBy("postedTime").startAfter(lastPosition || 0).limit(4).get()
    }
    

    const value = {
        insertIntoDB,
        getPosts
       
    }

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}

export default DataBase
