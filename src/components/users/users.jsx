import './styles.css';
import { useLoaderData, Form } from 'react-router-dom';

// loader function for user's friends
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

// loader function for users not friend of users
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

// action function for unfriend a user
export async function removeFriend({request}){
  const formData = await request.formData();;
  // console.log(formData.get('friendId'));
  const response = await fetch(`http://localhost:3000/protected/users/${formData.get('friendId')}/unfriend`,{
    method: 'post',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  // const data = await response.json();
  return null;
}

// react component
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