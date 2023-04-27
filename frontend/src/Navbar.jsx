import { useNavigate } from 'react-router'
import axios from 'axios';
import React, { useEffect, useState, useContext} from 'react';
import { UserContext } from './App';

export default function () {
  const { activeUsername, setActiveUsername } = useContext(UserContext);

  async function checkIfUserIsLoggedIn() {
      const response = await axios.get('/api/users/isLoggedIn')
      setActiveUsername(response.data.username)
  }

  useEffect(() => {
      checkIfUserIsLoggedIn()
  }, []);

  async function logOutUser() {
      await axios.post('/api/users/logOut')
      setActiveUsername(null)
  }

  const LogoutComponent = 
  <div className="d-flex align-items-center">
    <a className="nav-link" href="/login">
      <button type="button" className="btn btn-link px-3 me-2">
        Log In
      </button>
    </a>
    <a className="nav-link" href="/register">
      <button type="button" className="btn btn-primary me-3">
        Sign up
      </button>
    </a>
  </div>

  const loggedinComponent = 
  <div className="d-flex align-items-center">
    <span className="navbar-text px-3">
      Welcome, {activeUsername}
    </span>
    <a className="nav-link" onClick={logOutUser}>
      <button type="button" className="btn btn-primary me-3">
        Log out
      </button>
    </a>
  </div>

  const loggingComponent = activeUsername ? loggedinComponent : LogoutComponent;

  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-mdb-toggle="collapse"
          data-mdb-target="#navbarButtonsExample"
          aria-controls="navbarButtonsExample"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="fas fa-bars"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarButtonsExample">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link" href="/">TwitBird</a>
            </li>
          </ul>
          {loggingComponent}
        </div>
      </div>
    </nav>
    
    </div>
  )
}