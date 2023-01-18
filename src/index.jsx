import React from 'react'
import ReactDOM from 'react-dom/client'

import Navbar from './components/navbar/navbar.jsx';
import Home from './components/home/home.jsx';
// import Post from './components/post/post.jsx';
// import Login from './components/login/login'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <>
    <Navbar />
    <Home />
    {/* <Post /> */}
    {/* <Login /> */}
    </>
  </React.StrictMode>,
)
