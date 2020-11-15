import React from 'react'
import LoginForm from '../../Components/LoginForm/LoginForm'
import Logo from "../../Components/Logo"

import "./login.css"
import login_cover from "../../images/login-cover-waifu.png"
function Login() {
    return (
        <div id="login-page-wraper">
            <div id="logo"><Logo /></div>
            <div id="login-cover-image">
                <img src={login_cover} alt="login-cover-waifu"/>
            </div>
            <div>
            <LoginForm />
            </div>
        </div>
    )
}

export default Login
