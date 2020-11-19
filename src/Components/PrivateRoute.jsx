import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import { StorageProvider } from '../Context/StorageContext'

function PrivateRoute({component: Component,  ...rest}) {

    const {currentUser} = useAuth()




    return (
        <StorageProvider>
            <Route
            {...rest}
            render={props => (
                currentUser? <Component {...props}/> : <Redirect to="/login"/>
            )} />
        </StorageProvider>

    )
}

export default PrivateRoute
