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
        }

       await db.collection("posts").add(postPayLoad)
       console.log("Stored")
    }

    const getPosts = () => {
        return db.collection("posts").get()
        // console.log(querySnapshot)
        // querySnapshot.forEach(function(doc) {
        //     // doc.data() is never undefined for query doc snapshots
        //     console.log(doc.id, " => ", doc.data());
        // });
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
