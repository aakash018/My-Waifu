import React, {useRef, useState} from 'react'
import MainButtons from '../MainButtons/MainButtons'
import ErrorBox from "../ErrorBox/ErrorBox"
import Message from "../../Components/MessageBox/MessageBox"



import { useAuth } from "../../Context/AuthContext"
import "./forgotPassword.css"

function ForgotPassword() {

    const [error, setError] = useState({
        display: false,
        message: ""
    })
    const [loading, setLoading] = useState(false)
    const [message, setMessage] = useState({
        display: false,
        message: ""
    })


    const email = useRef("")
    const { resetPassword } = useAuth()

    const handleResetPassword = async (e) => {
        e.preventDefault()

        setLoading(true)
        try{
        await resetPassword(email.current.value)
        setMessage({
            display: true,
            message: "Email sent"
        })
        setLoading(false)
        }catch(e){
            setError({
                display: true,
                message: e.message
            })
            setLoading(false)
            console.log(e)
        }
    }   

    return (
        <div className="forgot-password-form" >
            <div className="headind-reset">Reset Password</div>
            {error.display && <ErrorBox errorMessage={error.message}/>}
            {message.display && <Message message={message.message}/>}
            <form onSubmit={handleResetPassword}>
                <label htmlFor="email" >Email</label>
                <input type="email" id="email" className="input-element" ref={email}/>
                <MainButtons type="submit" disabled={loading} text={"Submit"}/>
            </form>
        </div>
    )
}

export default ForgotPassword
