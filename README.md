# Odinbook
A facebook-clone build with intention of integrating most of the core Facebook functionality in this project.

## Table of Contents
+ [General Info](#general-info)
+ [Technologies](#technologies)
+ [Setup](#setup)
+ [Demo](#demo)
+ [Featues](#features)
+ [Sources](#sources)

## General Info
This project is facebook-clone, (only core functions), where people can socialize with other users. This app allow
you to share your posts with your other friends signed up on odinbook.
The backend used for this project is [https://github.com/Tanishka-2000/odinbook_api](https://github.com/Tanishka-2000/odinbook_api), another repository on this account. Backend is created using node, express and mongodb. [https://github.com/Tanishka-2000/odinbook_api](https://github.com/Tanishka-2000/odinbook_api) serves REST APIs which is utilized by odinbook to fetch and store user data.

## Technologies
> This is a frontend of the full stack project. The complete project is created using
+ Node (Backend)
+ Express (Backend Framework)
+ Mongodb (Database)
+ Passport.js (Authentication)
+ React (Frontend)

## Setup
To run this project locally,
```
# clone this repository
git clone https://github.com/Tanishka-2000/odinbook.git

# Go into the repository
cd odinbook

# install dependencies
npm install

# start app
npm run dev

```
> To see the APIs used by this app go to [https://github.com/Tanishka-2000/odinbook_api](https://github.com/Tanishka-2000/odinbook_api) 

## Demo
Here is the working live demo [https://tanishka-odinbook.netlify.app](https://tanishka-odinbook.netlify.app/)
> This application is deployed on [Netlify](https://www.netlify.com/)

## Features
+ Responsiveness.
+ First thing you see is the login page.
  - You can create new Account.
  - Login with existing account.
  - Login as guest to browse through the app.
+ After login/signin, you are directed to home page. Home page shows you all the posts by the user and his/her friends.
+ Navigation bar provides you with link to
  - Home
  - Friends
  - Write
  - Requests
  - Find Friends (users not friend and not with pending request)
  - Settings
  - Profile
  - Notifications
+ ### Home
  Features of the posts found on home page.
  - Like the post.
  - Comment on Post.
  - Save the post.
  - Go to user profile of the post author by clicking on its name.
+ ### Friends
  Friends route shows you a list of all your friends.
  - Each list item shows friend's profile image, name and a button 'unfriend' him/her.
  - Clicking on friend's name takes you friend's profile.  
  - Clicking on 'unfriend' button, removes the user from friend list instantly.
+ ### Write
  'Write' route lets you share your post, add tags and image.
+ ### Requests
 Shows you all requests sent and recieved by user.
 - Sent Requests
   - Each request shows you user image, name and status(pending/accepted/declined).
   - Accepted/declined requests can be deleted.
 - Recieved Requests
   - Each request shows you user name, image and two buttons(accept request/decline request).
   - Request is removed once it is accepted/declined.
+ ### Find Friends
  - A list of all users of odinbook who are not friend of user or have any pending request with user.
  - Each list item shows user image, name and a button 'add friend'.
  - On clicking 'add friend' button, sends friend request to the user, and add new request to sent requests list.
+ ### Settings
  Clicking on settings button provides you with following options.
  - Saved Posts
    - Take you to the 'saved posts' route, where all the posts saved by user are shown.
  - Change Password
    - Take you to a new page with a form to change your password.
  - light mode / dark mode
    - Let you toggle the mode(light/dark).
  - log out
    - Log user out and redirect user to the login page. 
+ ### Profile
  Takes the user to the profile page where user can find all the information regarding his/her account.
  - You can edit your profile by clicking on 'edit profile' btn
  - Find information regarding user.
  - Find all posts shared by the user.
+ ### Notifications
  Notification shows the following information
  - Any user has liked your post.
  - Any user has commented on your post.
  - Any User has removed you from his/her friends list (unfriend you).

## Sources
  This app is inspired by Facebook.