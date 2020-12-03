import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../Context/AuthContext'
import DataBase from '../Context/DataBase'
import { StorageProvider } from '../Context/StorageContext'

function PrivateRoute({component: Component,  ...rest}) {

    const {currentUser} = useAuth()




    return (
        <StorageProvider>
            <DataBase>
                <Route
                {...rest}
                render={props => (
                    currentUser? <Component {...props}/> : <Redirect to="/login"/>
                )} />
            </DataBase>
        </StorageProvider>

    )
}

export default PrivateRoute
