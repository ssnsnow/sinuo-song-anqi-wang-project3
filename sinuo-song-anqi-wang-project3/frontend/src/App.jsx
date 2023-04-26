import { useState } from 'react'
import axios from 'axios'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import Navbar from './Navbar';
import { createContext } from 'react';
import HomePage from './HomePage';
import Login from './Login';
import CreateUser from './CreateUser';
import PostsHomePage from './PostsHomePage';

export const UserContext = createContext({
  activeUsername: '',
  setActiveUsername: () => {}
});

function App() {
  const [activeUsername, setActiveUsername] = useState('');

  return (
    <UserContext.Provider value={{activeUsername, setActiveUsername}}>
      <BrowserRouter>
        <Routes>
          <Route path = "/" element = {<PostsHomePage/>}/>
          <Route path = "/login" element={<Login/>} />
          <Route path = "/register" element={<CreateUser/>} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
      
    )
}

export default App;