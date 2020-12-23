import React, {useEffect, useState, useRef} from 'react'
import PostCard from "../../Components/PostCard/PostCard"
import { useDatabase } from '../../Context/DataBase'

import "./postContainer.css"
const PostContainer = () => {
    const [loadMorePost, setLoadLoadPOst] = useState(true)
    const [posteImagesURL, setImageURL] = useState([])


    let lastPostPosition = useRef(null)


    const { getPosts } = useDatabase()
    useEffect(() => {
        const fetchPosts = async() => {
            try {
                if(loadMorePost){
                    const querySnapshot = await getPosts(lastPostPosition.current)
                    const temporaryListOfURL  = querySnapshot.docs.map(doc => {
                        lastPostPosition.current = doc
                        
                        return {
                        id: doc.id,
                        img: doc.data().postIMG,
                        postedBy: doc.data().postedBy,
                        posterProfilePicture: doc.data().posterProfilePic,
                        postedTime: doc.data().postedTime 
                        }
                    })
                    setImageURL(p => p.concat(temporaryListOfURL))
                }
            } catch (e) {
               console.log(e) 
            }
        }
        fetchPosts()
        setLoadLoadPOst(false)
    },[getPosts, loadMorePost])

    useEffect(() => {
        if(document !== null) {
            document.addEventListener("scroll", handleScroll)
        }
        return () => document.removeEventListener("scroll", handleScroll)
    })

    const handleScroll = () => {
        if(window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight){
            setLoadLoadPOst(true)
        }
    }

    return (
        <div id="post-container" >
          {
          posteImagesURL.map((url, index) => (
          <PostCard 
          id={url.id}
          imageURL={url.img} 
          key={index} 
          postedBy={url.postedBy} 
          posterProfilePicture={url.posterProfilePicture}
          postedTime={url.postedTime}
          />
          ))}
        </div>
    )
}

export default PostContainer
