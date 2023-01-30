import './styles.css';
// import userImage from '../../images/user.jpg';
import { useState } from 'react';
import { Link, redirect, useLocation, useNavigate } from 'react-router-dom';

export default function Navbar(){

  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const location = useLocation();
  // console.log(location);
  const loadNotifications = async () => {
    const response = await fetch('http://localhost:3000/protected/notifications',{
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = await response.json();
    setNotifications(data);
    setShowNotifications(true);
  }

  return(
    <nav>

      <div className='first'>
        {/* desktop view */}
        <li className='logo '>
          <Link to='/'><span className='symbol'>B</span></Link>
        </li>
        {/* mobile view */}
        <li className='logo-name '>
          <Link to='/'><span className='name'>Odinbook</span></Link>
        </li>
        <li
          title='profile'
          className='mobile-view'
        >
          <Link to='/profile'><img className='account-img' src={localStorage.getItem('avatar')}/></Link>
        </li>
        <li
          title='settings'
          className='mobile-view setting'
          onClick={() => setShowSettings(prev => !prev)}
        >
          <span className='material-symbols-outlined round-icon'>apps</span>
          <Dropdown setShowSettings={setShowSettings} showSettings={showSettings}/>
        </li>
      </div>

      <div className='middle'>
        <li
          title='home'
          className={location.pathname == '/' ? 'active' : ''}
        >
          <Link to ='/'><span className='material-symbols-outlined icon'>home</span></Link>
        </li>

        <li
          title='friends'
          className={location.pathname == '/friends' ? 'active' : ''}
        >
          <Link to ='/friends'><span className='material-symbols-outlined icon'>group</span></Link>
        </li>

        <li
          title='write post'
          className={location.pathname == '/write' ? 'active' : ''}
          >
          <Link to ='/write'><span className='material-symbols-outlined icon'>edit_square</span></Link>
        </li>
        {/* add link in mobile view */}
        <li
          title='notifications'
          className={'mobile-view notifications'}
          onClick={() => setShowNotifications(prev => !prev)}
        >
          <span className='material-symbols-outlined icon'>notifications</span>
          <Notifications
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
            notifications={notifications}
            loadNotifications={loadNotifications}           
          />
        </li>

      </div>

      <div className='last'>
      {/* mobile view */}
        <li className='requests' title='requests'>
          <Link to ='/requests'>Requests</Link>
        </li>

        <li className='find-friends' title='search friends'>
          <Link to ='/users'>Find Friends</Link>
        </li>

      {/* desktop view  */}
        <li className='desktop-view setting' onClick={() => setShowSettings(prev => !prev)} tabIndex='0'>
          <span className='material-symbols-outlined round-icon'>apps</span>
          <Dropdown setShowSettings={setShowSettings} showSettings={showSettings}/>
        </li>

        <li title='profile' className='desktop-view'>
          <Link to ='/profile'><img className='account-img' src={localStorage.getItem('avatar')}/></Link>
        </li>

        <li title='notifications'
          className='desktop-view notifications'
          onClick={() => showNotifications ? setShowNotifications(false): loadNotifications()}
          tabIndex='0'
        >
          <span className='material-symbols-outlined round-icon'>notifications</span>
          <Notifications
            setShowNotifications={setShowNotifications}
            showNotifications={showNotifications}
            notifications={notifications}
            loadNotifications={loadNotifications}           
          />
        </li>
      </div>

    </nav>
  )
}

function Dropdown({setShowSettings, showSettings}) {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const changeTheme = () => {
    document.getElementById('root').className = darkMode ? 'light' : 'dark';
    setDarkMode(p => !p);
  }

  const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('avatar');
    localStorage.removeItem('name');
    navigate('/login');
  }

  return(
    <div className={`dropdown ${showSettings ? 'shown' : ''}`}>
      <div className='header'>
        <h2>Settings</h2>
        <span className="material-symbols-outlined round-icon"
          onClick={e => {setShowSettings(false); e.stopPropagation()}} 
        >
          close
        </span>
      </div>
      <div>
        <Link to='/saved-posts'>
          <span className="material-symbols-outlined round-icon">bookmark_added</span>
          saved posts
        </Link>
        </div>
      <div>
        <span className="material-symbols-outlined round-icon">key</span>
        change passwords
      </div>
      <div onClick={changeTheme}>
        <span className="material-symbols-outlined round-icon"> {darkMode ? 'light_mode' : 'dark_mode'}</span>
        {darkMode ? 'light mode' : 'dark mode'}
      </div>
      <div onClick={logOut}>
        <span className="material-symbols-outlined round-icon">logout</span>
        log out
        </div>
    </div>
  )
}

function Notifications({setShowNotifications, showNotifications, notifications, loadNotifications}) {

  const deleteNotification = async (e, notificationId) => {

    e.stopPropagation();
    const response = await fetch(`http://localhost:3000/protected/notifications/${notificationId}`,{
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    loadNotifications();
  }

// console.log(notifications);
  return(
    <div className={`notificatons-list ${showNotifications ? 'shown' : ''}`}>
      <div className='header'>
        <h2>Notifications</h2>
        <span className="material-symbols-outlined round-icon" 
          onClick={e => {setShowNotifications(false); e.stopPropagation()}} 
        >
          close
        </span>
      </div>
          {/* case 'post_liked' : return <div key={notification._id}>{notification.userId.name} has liked your <Link to ={`/posts/${notification.postId}`}>post</Link></div>; break; */}
      {notifications.map((notification, i) => {
        switch(notification.domain){
          case 'commented on post' : 
            return (
              <div key={notification._id}>
                  <p>{notification.userId.name} has commneted on your <Link to ={`/posts/${notification.postId}`}>post</Link></p>               
                  <button onClick={e => deleteNotification(e,notification._id)}>
                    <span className="material-symbols-outlined">delete</span>
                  </button>
              </div>
            );
          case 'post shared' : 
            return (
              <div key={notification._id}>
                <p>{notification.userId.name} has shared Link new <Link to ={`/posts/${notification.postId}`}>post</Link></p>
                <button onClick={e => deleteNotification(e,notification._id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            );
          case 'unfriend' : 
            return (
              <div key={notification._id}>
                <p>{notification.userId.name} has unfriended removed you.</p>
                <button onClick={e => deleteNotification(e,notification._id)}>
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            );
        }
      })}
    </div>
  )
}