import React, { useContext } from 'react'

import { database as db} from "../firebase/config"
import {useAuth} from "../Context/AuthContext"

const DatabaseContext = React.createContext()
export const useDatabase = () => {
    return useContext(DatabaseContext)
}


function DataBase({children}) {
    const {currentUser} = useAuth()

    const getLikedPostList = async (uid) => {
        const fetchedData = await db.collection("userData").doc(uid).get()
        return fetchedData.data().likedPost
    }

    const updateUserAdditionalInfo = async (oldLikedList, uid, postId, action) => {
        let newLikedList = [];
        if (action === "add") {
            console.log(1)
            newLikedList = oldLikedList.concat(postId)
        } else {
            console.log(2)
            newLikedList = oldLikedList.filter(listID => listID !== postId)
        }
        console.log(newLikedList)
        return db.collection("userData").doc(uid).update({likedPost: newLikedList})
    }


    const insertIntoDB = async (data) => {
        const postPayLoad = {
            postIMG: data,
            postedBy: currentUser.displayName,
            postedTime: Date.now(),
            posterProfilePic: currentUser.photoURL,
            likes: 0,
        }
       return db.collection("posts").add(postPayLoad)
    }

    const updateLikes = (oldLikes, id, action) => {
        if (action === "like") return db.collection("posts").doc(id).update({likes: oldLikes + 1})
        else { 
        return db.collection("posts").doc(id).update({likes: oldLikes - 1})
              }
    }


    const getPosts = (lastPosition) => {
        return db.collection("posts").orderBy("postedTime").startAfter(lastPosition || 0).limit(4).get()
    }
    
    const getSpecificPost = (postId) => {
        return db.collection("posts").doc(postId).get()
    }

    const value = {
        getLikedPostList,
        updateUserAdditionalInfo,
        insertIntoDB,
        getPosts,
        getSpecificPost,
        updateLikes
       
    }

    return (
        <DatabaseContext.Provider value={value}>
            {children}
        </DatabaseContext.Provider>
    )
}

export default DataBase
