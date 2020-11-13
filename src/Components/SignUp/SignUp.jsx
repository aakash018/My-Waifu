import React, {useRef, useState} from 'react'
import {useAuth} from "../../Context/AuthContext"


const SignUp = () => {

    const username = useRef(null)
    const password= useRef(null)
    const confirm_password= useRef(null)
    const email= useRef(null)

    const [error, setError] = useState({
        display: false,
        message: ""
    })

    const { signup } = useAuth()
    const handleSubmit = async (e) => {
        e.preventDefault()
            signup(email.current?.value, password.current?.value, username.current.value).then(userCredentials => {
                userCredentials.user.updateProfile({
                    displayName: username.current.value
                })
            }).catch(e => {
                setError({
                    display: true,
                    message: e.message
                })
            }) 
    }
    

    return (
        <div className="signUp-form-container">
            <h2>Sign Up</h2>
            {error.display && error.message}
           <form action="POST" onSubmit={handleSubmit}>
               <div>
                   <section className="inputlable">Username</section>
               <input type="text" id="username" ref={username}/>
               </div>
               <div>
               <section className="inputlable">Password</section>
               <input type="password" id="password" ref={password}/>
               </div>
               <div>
               <section className="inputlable">Confirm Password</section>
               <input type="password" id="confirm-password" ref={confirm_password}/>
               </div>
               <div>
               <section className="inputlable">Email</section>
                <input type="email" id="email" ref={email}/>
                </div>
                <button type="submit">SignUp</button>
           </form>
        </div>
    )
}

export default SignUp
