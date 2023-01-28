import React from 'react'
import ReactDOM from 'react-dom/client'
import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Main , {loader as mainLoader} from './components/main/main';
// import Navbar from './components/navbar/navbar.jsx';
// import Home from './components/home/home.jsx';
import Root , {loader as rootLoader} from './components/login/root'
import Login, {action as loginAction} from './components/login/login';
import Signup, {action as signupAction} from './components/login/signup';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: rootLoader,
  },
  {
    path: '/login',
    element: <Login />,
    action: loginAction
  },
  {
    path: '/signup',
    element: <Signup />,
    action: signupAction
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
    {/* <> */}
    {/* <Navbar />
    <Home /> */}
    {/* <Login /> */}
    {/* </> */}
  </React.StrictMode>,
)
