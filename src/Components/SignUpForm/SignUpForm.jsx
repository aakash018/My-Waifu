import React, {useRef, useState} from 'react'
import { Link, useHistory } from "react-router-dom"

import {useAuth} from "../../Context/AuthContext"
import { useDatabase } from '../../Context/DataBase'
import ErrorBox from '../ErrorBox/ErrorBox'
import MainButton from "../MainButtons/MainButtons"

import "./signUp.css"

function SignUpForm(){

    const username = useRef("")
    const password= useRef("")
    const confirm_password= useRef("")
    const email= useRef("")

    const [error, setError] = useState({
        display: false,
        message: ""
    })

    const [loading, setLoading] = useState(false)

    const { signup, userAdditionalInfoInit } = useAuth()
    const history = useHistory()
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(username.current.value.trim() === "" ||
            password.current.value.trim() === "" ||
            confirm_password.current.value.trim() === "" ||
            email.current.value.trim() === "") {
                setLoading(false)
                return setError({
                    display: true,
                    message: "Empty Fields"
                })
            } else if (password.current.value !== confirm_password.current.value) {
                setLoading(false)
                return setError ({
                    display: true,
                    message: "Confirm Passsword did not match"
                })
            } else if (!new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(email.current.value)) {
                setLoading(false)
                return setError({
                    display: true,
                    message: "Bad Email"
                })
            } else {
                setError({
                    display: false,
                    message: ""
                })
            }
            try{
                console.log(email.current?.value, password.current?.value, username.current.value)
                const userCredentials = await signup(email.current?.value, password.current?.value, username.current.value)
                await userCredentials.user.updateProfile({
                         displayName: username.current.value
                    })
                await userAdditionalInfoInit(userCredentials.user.uid)
                setLoading(false)
                history.push("/profile-picture-upload")
            } catch(e) {
                setLoading(false)
                setError({
                    display: true,
                    message: e.message
                })
            }
    }
    

    return (
        <div className="signUp-form-container">
            <h2 className="heading-signup">Sign Up</h2>
            <section className="error-signUp">
            {error.display && <ErrorBox errorMessage={error.message}/>}
            </section>
           <form action="POST" onSubmit={handleSubmit}>
               <div>
                   <label className="inputlable" htmlFor="username">Username</label>
               <input type="text" id="username" ref={username}/>
               </div>
               <div>
               <label className="inputlable" htmlFor="password">Password</label>
               <input type="password" id="password" ref={password}/>
               </div>
               <div>
               <label className="inputlable" htmlFor="confirm-password">Confirm Password</label>
               <input type="password" id="confirm-password" ref={confirm_password}/>
               </div>
               <div> 
               <label className="inputlable" htmlFor="email">Email</label>
                <input type="text" id="email" ref={email}/>
                </div>
                <MainButton text={"SignUp"} type={"submit"} disabled={loading}/>
           </form>
           <section className="have-an-acount">Already have an account. <Link to="/login" >Login</Link></section>
        </div>
    )
}

export default SignUpForm
