import React from 'react'
import InfoSection from '../../Components/InfoSection/InfoSection'
import PostContainer from '../../Components/PostContainer/PostContainer'
import { useAuth } from '../../Context/AuthContext'



import "./home.css"
function Home() {


    const {logout, currentUser} = useAuth()

    const handelLogout = async () => {
        await logout()
    }
    return (
        <div>
            {console.log(currentUser)}
            {currentUser.photoURL && <img src={currentUser.photoURL} />}
          <button onClick={handelLogout} style={{position: "absolute", left: "50%"}}>Logout</button>         
          <div id="posts-wraper">
          <PostContainer />
          </div>
          <InfoSection />
        </div>
    )
}

export default Home
