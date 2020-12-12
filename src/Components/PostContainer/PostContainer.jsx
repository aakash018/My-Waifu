import React, {useEffect, useState, useRef} from 'react'
import PostCard from "../../Components/PostCard/PostCard"
import { useDatabase } from '../../Context/DataBase'

import "./postContainer.css"
const PostContainer = () => {
    const [loadMorePost, setLoadLoadPOst] = useState(true)
    const [posteImagesURL, setImageURL] = useState([])


    let lastPostPosition = useRef(null)
    const postContainer = useRef(null)


    const { getPosts } = useDatabase()
    useEffect(() => {
        const fetchPosts = async() => {
            if(loadMorePost){
                const querySnapshot = await getPosts(lastPostPosition.current)
                const temporaryListOfURL  = querySnapshot.docs.map(doc => {
                    lastPostPosition.current = doc
                    return doc.data().postIMG
                })
                setImageURL(p => p.concat(temporaryListOfURL))
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
        <div id="post-container" ref={postContainer} >
          {posteImagesURL.map((url, index) => <PostCard imageURL={url} key={index} postedBy={"name"}/>)}
        </div>
    )
}

export default PostContainer
