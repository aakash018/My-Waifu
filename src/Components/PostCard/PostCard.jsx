import React from 'react'

import "./postCard.css"

function PostContainer({imageURL, postedBy, posterProfilePicture}) {


    return (
        <article className="post-card">
            <section className="post-info-container">
                <div className="poster-pic" style={{backgroundImage: `url(${posterProfilePicture})`}} />
                <div className="poster-name">{postedBy}</div>
            </section>
            <img src={imageURL} alt={`${postedBy}'s post`} alt={`postFrom-${postedBy}`}/>
        </article>
    )
}

export default PostContainer
