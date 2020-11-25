import React from 'react'
import InfoSection from '../../Components/InfoSection/InfoSection'
import WaifuOfTheDay from '../../Components/WaifuOfTheDay/WaifuOfTheDay'
import { useAuth } from '../../Context/AuthContext'
import { useStorage } from '../../Context/StorageContext'

import "./home.css"
function Home() {


    const {currentUser, logout} = useAuth()
    

    const handelLogout = async () => {
        await logout()
    }

    

    return (
        <div>

          <button onClick={handelLogout} style={{position: "absolute", left: "50%"}}>Logout</button>
          {console.log(currentUser)}
          <img src={currentUser.photoURL} style={{position: "absolute", left: "20%"}}/>
          <WaifuOfTheDay />
          <InfoSection />
        </div>
    )
}

export default Home
