import './styles.css';
import cat3 from '../../images/cat3.jpg';

export default function Users(){
  let userlist = true;
  return(
    <div className='users'>
      <h1 className='users-list-heading'>{userlist ? 'Users List' : 'Friends List'}</h1>
      <User userlist={userlist}/>
      <User userlist={userlist}/>
      <User userlist={userlist}/>
      <User userlist={userlist}/>
      <User userlist={userlist}/>
    </div>
  )
}

// can be used for friends list and users list
function User({userlist}){
  return(
    <div className='user'>
    {/* later replace with image of friend */}
      <img className='account-img' src={cat3}/>  
      <p>Ginger Brown</p>
      <button title={`${userlist ? 'add to' : 'remove from'} friends list`}>{userlist ? 'add friend' : 'unfriend'}</button>
    </div>
  )
}