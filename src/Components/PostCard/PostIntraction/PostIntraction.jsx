import React, { useState, useEffect } from 'react'
import { useAuth } from '../../../Context/AuthContext'
import { useDatabase } from '../../../Context/DataBase'

const PostIntraction = ({likes, id}) => {

    const [clientLikes, setLikes] = useState(0)
    const {currentUser} = useAuth()
    const {updateUserAdditionalInfo, getLikedPostList} = useDatabase()
    const { getSpecificPost, updateLikes } = useDatabase()
    useEffect(async() => {
        const requiredPost = await getSpecificPost(id)
        const number_of_old_likes = requiredPost.data().likes
        setLikes(number_of_old_likes)
    }, [])

    const handleLike = async() => {

        const likedPostList = await getLikedPostList(currentUser.uid)


        if(likedPostList.includes(id)){
            const requiredPost = await getSpecificPost(id)
            const number_of_old_likes = requiredPost.data().likes
            try {
            await updateLikes(number_of_old_likes, id, "unlike")
            await updateUserAdditionalInfo(likedPostList ,currentUser.uid, id, "remove")
            } catch (e) {
                console.log('Error' + e)
            }
            setLikes(number_of_old_likes - 1)
            console.log("Done")
        } else {
            const requiredPost = await getSpecificPost(id)
            const number_of_old_likes = requiredPost.data().likes
            try {
            await updateLikes(number_of_old_likes, id, "like")
            await updateUserAdditionalInfo(likedPostList ,currentUser.uid, id, "add")
            } catch (e) {
                console.log('Error' + e)
            }
            setLikes(number_of_old_likes + 1)
            console.log("Done")
        }
        
    }

    return (
        <>
           <button onClick={handleLike}>Like</button>
           <span className="likesCount">{clientLikes}</span> 
        </>
    )
}

export default PostIntraction
