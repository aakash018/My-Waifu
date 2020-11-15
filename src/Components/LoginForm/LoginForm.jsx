import React, {useRef, useState} from 'react'
import { Link, useHistory } from "react-router-dom"

import {useAuth} from "../../Context/AuthContext"
import ErrorBox from '../ErrorBox/ErrorBox'
import MainButtons from "../MainButtons/MainButtons"

import "./LoginForm.css"

function LoginForm() {

    const history = useHistory()
    const password= useRef("")
    const email= useRef("")

    const [error, setError] = useState({
        display: false,
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const { login } = useAuth()


    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        if(password.current.value.trim() === "" || email.current.value.trim() === "") {
                setLoading(false)
                return setError({
                    display: true,
                    message: "Empty Fields"
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

            login(email.current?.value, password.current?.value)
            .then(user => {
                setLoading(false)
                history.push("/")
            })
                .catch(e => {
                setLoading(false)
                setError({
                    display: true,
                    message: e.message
                })
            }) 
    }
    


    return (
        <div className="login-form">
            <div className="login-error-container">
            {error.display && <ErrorBox errorMessage={error.message}/>}
            </div>
            <form action="POST" onSubmit={handleSubmit}>
                <label htmlFor="email">Username</label>
                    <input type="text" id="email" ref={email}/>
                <label htmlFor="password">Password</label>
                    <input type="password" id="password" ref={password}/>
                <MainButtons type="submit" text={"Log In"} disabled={loading}/>
            </form>
            <section className="make-an-account">Need an account! <Link to="/signup">SignUp</Link></section>
        </div>
    )
}

export default LoginForm
