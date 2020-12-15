import React from 'react'

const PostIntraction = () => {

    const handleLike = () => {
        console.log("Lilked")
    }

    return (
        <>
           <button onClick={handleLike}>Like</button> 
        </>
    )
}

export default PostIntraction
