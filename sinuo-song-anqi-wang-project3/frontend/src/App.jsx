import { useState } from 'react'
import axios from 'axios'
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Navbar from './Navbar';
import Pokemons from './Pokemons';

function App() {
  return (
    <div>
      <Navbar/>
      <HomePage />
    {/* <Routes>
      <Route path = "/" element = {<HomePage/>}/>
      <Route path = "/login" element={<Login/>} />
      <Route path = "/register" element={<CreateUser/>} />
      <Route path = "/getPokemons" element={<Pokemons/>} />
    </Routes> */}
    </div>
  )
}

export default App;