import React, { useState, useContext, useEffect } from 'react'
import {auth, provider} from "../firebase/config"
import { database as db} from "../firebase/config"


const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}



function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const userAdditionalInfoInit = (uid) => {
        const payLoad = {
            likedPost: []
        }
        
        return db.collection("userData").doc(uid).set(payLoad)
    }

    const signup = (email, password) => {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }

    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    const loginInWithGoogle = () => {
        return auth.signInWithPopup(provider)
    }
    
    useEffect(() => {
       
       const unsubscribe = auth.onAuthStateChanged(user => {
        setCurrentUser(user)
        setLoading(false)
       })
       return unsubscribe
    }, [])
    
    
    
    const value = {
        currentUser,
        signup,
        login,
        logout,
        resetPassword,
        loginInWithGoogle,
        userAdditionalInfoInit
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
