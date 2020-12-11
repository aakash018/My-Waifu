import React from 'react'

import "./postCard.css"

function PostContainer({imageURL, postedBy}) {


    return (
        <div className="post-card">
            <img src={imageURL} alt={`${postedBy}'s post`}/>
        </div>
    )
}

export default PostContainer
