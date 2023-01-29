import './styles.css';
import { useLoaderData } from 'react-router-dom';

export async function friendsLoader(){
  const response = await fetch('http://localhost:3000/protected/friends',{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();

  return data;
}

export async function usersLoader(){
  const response = await fetch('http://localhost:3000/protected/users',{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  const data = await response.json();

  return data;
}

export default function Users({friendList}){
  
  const users = useLoaderData();
  return(
    <div className='users'>
      <h1 className='users-list-heading'>{friendList ? 'Friends List' : 'Users List'}</h1>
      {users.map(user => <User key={user._id} friendList={friendList} user={user}/>)}
    </div>
  )
}

// can be used for friends list and users list
function User({friendList, user}){
  return(
    <div className='user'>
      <img className='account-img' src={user.image}/>  
      <p>{user.name}</p>
      <button title={`${friendList ? 'remove from':'add to'} friends list`}>{friendList ? 'unfriend' : 'add friend'}</button>
    </div>
  )
}