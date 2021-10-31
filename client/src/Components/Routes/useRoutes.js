import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import EditLinkPage from '../EditPages/EditLinkPage/EditLinkPage'
import Error from '../Error/Error'
import Files from '../Files/Files'
import Links from '../Links/Links'
import LoginPage from '../LoginPage/LoginPage'
import RegistrationPage from '../RegistrationPage/RegistrationPage'

function useRoutes(isAuthitenticated) {

    if (!isAuthitenticated) {
        return (
            <Switch>
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegistrationPage} />
                <Route component={Error} />
            </Switch>
        )
    }

    return (
        <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/links" component={Links} />
            <Route exact path="/links/create" component={EditLinkPage} />
            <Route exact path="/files" component={Files} />
            <Route component={Error} />
        </Switch>
    )

}

export default useRoutes
