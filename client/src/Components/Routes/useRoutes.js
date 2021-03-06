import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import About from '../About/About'
import CreateLinkPage from '../CreatePages/CreateLinkPage/CreateLinkPage'
import Dashboard from '../Dashboard/Dashboard'
import EditFilePage from '../EditPages/EditFilePage/EditFilePage'
import EditLinkPage from '../EditPages/EditLinkPage/EditLinkPage'
import Error from '../Error/Error'
import Files from '../Files/Files'
import Links from '../Links/Links'
import LoginPage from '../LoginPage/LoginPage'
import RegistrationPage from '../RegistrationPage/RegistrationPage'
import UserMenu from '../UserMenu/UserMenu'
import AppBar from '../AppBar/AppBar'
import CheckRegister from '../CheckRegister/CheckRegister'

function useRoutes(isAuthitenticated) {

    if (!isAuthitenticated) {
        return (
            <Switch>
                <Route exact path="/" >
                    <Redirect to="/login" />
                </Route>
                <Route path="/login" component={LoginPage} />
                <Route path="/checkRegister" component={RegistrationPage} />
                <Route path="/register" component={CheckRegister} />
                <Route component={Error} />
            </Switch>
        )
    }

    return (
        <>
            <AppBar />
            <div className="container">
                <Switch>
                    <Route exact path="/" component={Dashboard} />
                    <Route exact path="/links" component={Links} />
                    <Route exact path="/links/create" component={CreateLinkPage} />
                    <Route exact path="/links/:id" component={EditLinkPage} />
                    <Route exact path="/files" component={Files} />
                    <Route exact path="/files/:id" component={EditFilePage} />
                    <Route exact path="/about" component={About} />
                    <Route exact path="/userProfile" component={UserMenu} />
                    <Route component={Error} />
                </Switch>
            </div>
        </>
    )

}

export default useRoutes
