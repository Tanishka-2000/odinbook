import React from 'react'
import ReactDOM from 'react-dom/client'

import { 
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';

import Main , {loader as mainLoader} from './components/main/main';
import Login, {action as loginAction, loginGuestUser} from './components/login/login';
import Signup, {action as signupAction} from './components/login/signup';
import Home, {homeLoader, savedPostsLoader, postLoader} from './components/home/home';
import User, {friendsLoader, removeFriend ,usersLoader, sendFriendRequest} from './components/users/users';
import PostForm, {postFormAction} from './components/postForm/postForm';
import Profile, {profileLoader, friendProfileLoader} from './components/profile/profie';
import EditProfile, { deleteProfile, loadProfileData , profileAction} from './components/editProfileForm/editProfile';
import Requests, {requestsLoader, deleteRequest} from './components/requests/requests';
import ChangePasswordForm, {changePasswordAction} from './components/changePassword/changePasswordForm';
import ErrorPage from './components/errorPage/errorPage';
import './index.css'; 
// import { SkeletonUsers } from './components/users/users';
// import { SkeletonPosts } from './components/home/home';
import { SkeletonProfile } from './components/profile/profie';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    loader: mainLoader,
    errorElement: <ErrorPage />,
    children: [
      { index: true,
        element: <Home saved={false}/>,
        loader: homeLoader
      },
      {
        path: 'friends',
        element: <User friendList={true} />,
        loader: friendsLoader,
        action: removeFriend
      },
      {
        path: 'write',
        element:<PostForm />,
        action: postFormAction
      },
      {
        path: 'users',
        element:<User friendList={false} />,
        loader: usersLoader,
        action: sendFriendRequest
      },
      {
        path: 'saved-posts',
        element:<Home saved={true}/>,
        loader: savedPostsLoader,
      },
      {
        path: 'posts/:postId',
        element: <Home saved={false} />,
        loader: postLoader
      },
      {
        path: 'profile',
        element:<Profile isCurrentUser={true}/>,
        loader: profileLoader
      },
      {
        path: 'edit-profile',
        element: <EditProfile />,
        loader: loadProfileData,
        action: profileAction,
        children: [
          {
            path: 'delete',
            element: null,
            action: deleteProfile
          }
        ]
      },
      {
        path: 'users/:userId',
        element: <Profile isCurrentUser={false}/>,
        loader: friendProfileLoader
      },
      {
        path: 'requests',
        element: <Requests />,
        loader: requestsLoader,
        action: deleteRequest
      },
      {
        path: 'change-password',
        element: <ChangePasswordForm />,
        action: changePasswordAction
      }
    ],
  },
  {//delete root.jsx file in login folder
    path: '/login',
    element: <Login />,
    action: loginAction
  },
  {
    path: '/guest-login',
    element:null,
    action: loginGuestUser
  },
  {
    path: '/signup',
    element: <Signup />,
    action: signupAction
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router}/>
  {/* <SkeletonPosts /> */}
  {/* <SkeletonProfile /> */}
  </React.StrictMode>,
)
