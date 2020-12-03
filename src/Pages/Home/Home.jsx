import React, {useEffect, useState} from 'react'
import InfoSection from '../../Components/InfoSection/InfoSection'
// import WaifuOfTheDay from '../../Components/WaifuOfTheDay/WaifuOfTheDay'
import { useAuth } from '../../Context/AuthContext'
import { useDatabase } from '../../Context/DataBase'


import "./home.css"
function Home() {


    const {currentUser, logout} = useAuth()

    const { getPosts } = useDatabase()


    const [posteImagesURL, setImageURL] = useState([])
    

    const handelLogout = async () => {
        await logout()
    }

    useEffect(() => {
        const fetchPosts = async() => {
        const querySnapshot = await getPosts()
        let temporaryListOfURL = []
        querySnapshot.forEach(function(doc) {
                temporaryListOfURL.push(doc.data().postIMG)
            });
        setImageURL(temporaryListOfURL)
        }
        fetchPosts()
    },[getPosts])


    return (
        <div>
            {console.log(posteImagesURL.length)}
          <button onClick={handelLogout} style={{position: "absolute", left: "50%"}}>Logout</button>
          <img src={currentUser.photoURL} style={{position: "absolute", left: "20%"}} alt="profile-pic"/> 
          {/* <WaifuOfTheDay /> */}
          {posteImagesURL.map((url, index) => {
                return <img key={index} src={url}/>
          })
          }
          <InfoSection />
        </div>
    )
}

export default Home
