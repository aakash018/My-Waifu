import React from 'react'

import "./postCard.css"
import PostIntraction from './PostIntraction/PostIntraction'

function PostContainer({imageURL, postedBy, posterProfilePicture, postedTime, likes, id}) {

    
    return (
        <article className="post-card">
            <section className="post-info-container">
                <section className="poster-info">
                    <div className="poster-pic" style={{backgroundImage: `url(${posterProfilePicture})`}} />
                    <span className="poster-name">{postedBy}</span>
                </section>
                <div className="posted-time">{new Date(postedTime).toDateString()}</div>
            </section>
            <section className="post-img">
                <img src={imageURL} alt={`${postedBy}'s post`} alt={`postFrom-${postedBy}`}/>
            </section>
            <section className="post-intraction">
                <PostIntraction likes={likes} id={id}/>
            </section>
        </article>
    )
}

export default PostContainer
