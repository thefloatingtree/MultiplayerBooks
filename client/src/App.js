import React from 'react'
import {
    BrowserRouter as Router,
    Switch
} from "react-router-dom"
import { Landing } from './pages/landing/Landing'
import { Register } from './pages/register/Register'
import { Profile } from './pages/profile/Profile'
import PrivateRoute from './components/PrivateRoute'
import PublicRoute from './components/PublicRoute'

function App() {
    return (
        <Router>
            <Switch>
                <PublicRoute path="/" exact component={Landing}></PublicRoute>
                <PublicRoute path="/register" component={Register}></PublicRoute>
                <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
            </Switch>
        </Router>
    );
}

export default App;