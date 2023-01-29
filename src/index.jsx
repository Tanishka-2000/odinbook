import React from 'react'
import ReactDOM from 'react-dom/client'

import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Main , {loader as mainLoader} from './components/main/main';
import Login, {action as loginAction} from './components/login/login';
import Signup, {action as signupAction} from './components/login/signup';
import Home, {loader as homeLoader} from './components/home/home';
import User, {friendsLoader, usersLoader} from './components/users/users';
import PostForm from './components/postForm/postForm';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    children: [
      { index: true,
        element: <Home />,
        loader: homeLoader
      },
      {
        path: 'friends',
        element: <User friendList={true} />,
        loader: friendsLoader
      },
      {
        path: 'write',
        element:<PostForm />
      },
      {
        path: 'users',
        element:<User friendList={false} />,
        loader: usersLoader
      }
    ],
  },
  {//delete root.jsx file in login folder
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
