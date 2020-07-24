import React from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom"
import { Register } from './pages/register/Register'
import { Profile } from './pages/profile/Profile'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'
import Navbar from './components/navbar/Navbar'
import { Login } from './pages/login/Login'
import { PageNotFound } from './pages/pagenotfound/PageNotFound'
import RememberMe from './components/RememberMe'

function App() {
    return (
        <Router>
            <RememberMe></RememberMe>
            <Navbar></Navbar>
            <Switch>
                <PrivateRoute path="/" exact component={Profile}></PrivateRoute>
                <PublicRoute path="/login" component={Login}></PublicRoute>
                <PublicRoute path="/register" component={Register}></PublicRoute>
                <Route component={PageNotFound}></Route>
            </Switch>
        </Router>
    );
}

export default App;