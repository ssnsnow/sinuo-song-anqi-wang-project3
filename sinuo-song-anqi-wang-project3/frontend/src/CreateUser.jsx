import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import Navbar from './Navbar';

export default function CreateUser() {
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [createDate, setCreateDate] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function setUsername(event) {
        const username = event.target.value;
        setUsernameInput(username);
    }
    function setUserCreationDate() {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
        const day = currentDate.getDate().toString().padStart(2, '0');
        const hours = currentDate.getHours().toString().padStart(2, '0');
        const minutes = currentDate.getMinutes().toString().padStart(2, '0');
        const seconds = currentDate.getSeconds().toString().padStart(2, '0');
        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        setCreateDate(formattedDate);
    }

    function setPassword(event) {
        const pswd = event.target.value;
        setPasswordInput(pswd);
    }

    async function submit() {
        try {
            const response = await axios.post('/api/users/register', {username: usernameInput, password: passwordInput, createDate: createDate})
            navigate('/')
        } catch (e) {
            console.log(e)
            setError(e.response.data)
        }
        console.log(usernameInput, passwordInput);
    }

    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh',flexDirection: 'column' }}>
                <h1 class="mb-3">Register</h1>
                <form className="w-50">
                    <div className="form-outline mb-4">
                        <input type="email" id="form2Example1" className="form-control" value={usernameInput} onInput={setUsername}/>
                        <label className="form-label" htmlFor="form2Example1">UserName</label>
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="form2Example2" className="form-control" value={passwordInput} onInput={setPassword}/>
                        <label className="form-label" htmlFor="form2Example2">Password</label>
                    </div>

                    <button type="button" className="btn btn-primary btn-block mb-4" onClick={submit}>Register</button>
                </form>
                {!!error && 
                <div className="d-flex column">
                    <i className="fas fa-circle-exclamation me-2"></i>
                    <div className="errorMessage">
                        {error}
                    </div>
                </div>
                }
            </div>
        </div>
    )


}
