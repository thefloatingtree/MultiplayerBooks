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
import { AddBook } from './pages/addbook/AddBook'
import DisplayBook from './pages/displaybook/DisplayBook'

function App() {
    return (
        <Router>
            <RememberMe></RememberMe>
            <Navbar></Navbar>
            <Switch>
                <PrivateRoute path="/" exact component={Profile}></PrivateRoute>
                <PrivateRoute path="/book" exact component={DisplayBook}></PrivateRoute>
                <PrivateRoute path="/book/add" component={AddBook}></PrivateRoute>
                <PublicRoute path="/login" component={Login}></PublicRoute>
                <PublicRoute path="/register" component={Register}></PublicRoute>
                <Route component={PageNotFound}></Route>
            </Switch>
        </Router>
    );
}

export default App;