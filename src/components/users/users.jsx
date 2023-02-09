import './styles.css';
import { useLoaderData, Form, redirect, Link, defer, Await } from 'react-router-dom';
import { Suspense } from 'react';

// function to load users
async function getUsers(url){
  const response = await fetch(url,{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();
  return data;
}


// loader function for user's friends
export async function friendsLoader(){
  // const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/friends',{
  //   method: 'get',
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   }
  // });
  // const data = await response.json();
  let data = getUsers('https://odinbook-api-1dl4.onrender.com/protected/friends');
  return defer({users: data});
}

// loader function for users not friend of users
export async function usersLoader(){
  // const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/users',{
  //   method: 'get',
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   }
  // });
  // const data = await response.json();
  let data = getUsers('https://odinbook-api-1dl4.onrender.com/protected/users');
  return defer({users: data});
}

// action function for unfriend a user
export async function removeFriend({request}){
  const formData = await request.formData();
  const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/users/${formData.get('friendId')}/unfriend`,{
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return null;
}

// action function for sending a friend request
export async function sendFriendRequest({request}){
  const formData = await request.formData();
  const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/users/${formData.get('friendId')}/friendRequest `,{
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return redirect('/requests');
}

// react component
export default function Users({friendList}){
  
  const {users} = useLoaderData();
  return(
    <div className='users'>
      <h1 className='users-list-heading'>{friendList ? 'Friends List' : 'Users List'}</h1>
      <Suspense fallback={<SkeletonUsers />}>
        <Await resolve={users}>
          {(resolvedUsers) =>
            <>
           {resolvedUsers.map(user => <User key={user._id} friendList={friendList} user={user}/>)}
           </>
          }
        </Await> 
      </Suspense>
    </div>
  )
}

// can be used for friends list and users list
function User({friendList, user}){
  return(
    <div className='user'>
      <img className='account-img' src={user.image}/>  
      <p className='name'><Link to={user._id}>{user.name}</Link></p>
      <Form method='post'>
        <button
          title={`${friendList ? 'remove from':'add to'} friends list`}
          type='submit'
          name='friendId'
          value={user._id}
        >
          {friendList ? 'unfriend' : 'add friend'}
        </button>
      </Form>
    </div>
  )
}

export function SkeletonUsers(){
  return(
    <div className='skeleton-users'>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

    </div>
  )
}