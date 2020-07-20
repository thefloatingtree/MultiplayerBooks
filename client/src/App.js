import React from 'react'
import axios from 'axios'
import { useEffect } from 'react'

function App() {
    useEffect(() => {
        axios.post('/api/user/login', { username: 'tree', password: 'oatmeal' }).then(res => {
            console.log(res.data)
        })
        axios.post('/api/user/signup', { username: 'tree', password: 'oatmeal' }).then(console.log).catch(console.log)
    }, [])

    return (
        <div className="section">
            <div className="container">
                <h1 className="title">Multiplayer Books</h1>
                <h2 className="subtitle">Nice</h2>
            </div>
        </div>
    );
}

export default App;