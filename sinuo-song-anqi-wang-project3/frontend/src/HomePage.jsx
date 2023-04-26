import React, { useState, useEffect, useContext} from 'react'
import axios from 'axios'
import PostsHomePage from './PostsHomePage';
import Navbar from './Navbar';
// import { createContext } from 'react';
// export const UserContext = createContext({
//   activeUsername: '',
//   setActiveUsername: () => {}
// });

export default function HomePage() {
  // const [activeUsername, setActiveUsername] = useState('');

  return (
    <div>
        <PostsHomePage />
    </div>
  )
}