import React from 'react'

import SignUpForm from "../../Components/SignUpForm/SignUpForm";
import Logo from '../../Components/Logo';


import "./signUp.css"
//Images
import rem_cover from  "../../images/rem.png"
function SignUp() {
    return (
        <div className="signup-page">
            <div id="logo">
                <Logo />
            </div>
            <div className="signUp-cover-image">
                <img src={rem_cover} alt="rem-cover"/>
            </div>
            <div className="signUp-form-container">
                <SignUpForm />
            </div>
        </div>
    )
}

export default SignUp
