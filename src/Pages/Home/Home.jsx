import React from 'react'
import { useAuth } from '../../Context/AuthContext'

import "./home.css"
function Home() {


    const {currentUser} = useAuth()

    return (
        <div>
          
        </div>
    )
}

export default Home
