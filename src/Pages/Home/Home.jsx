import React from 'react'
import { useAuth } from '../../Context/AuthContext'

import "./home.css"
function Home() {


    const {currentUser, logout} = useAuth()

    const handelLogout = async () => {
        await logout()
    }

    return (
        <div>
          <button onClick={handelLogout}>Logout</button>
        </div>
    )
}

export default Home
