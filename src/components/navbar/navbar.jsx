import './styles.css';
import userImage from '../../images/user.jpg';
import { useState } from 'react';

export default function Navbar(){

  const [showSettings, setShowSettings] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  return(
    <nav>

      <div className='first'>
        {/* desktop view */}
        <li className='logo desktop-view'><a href='#'><span className='symbol'>B</span></a></li>
        <li className='search desktop-view'><span className='material-symbols-outlined search-icon'>search</span><input type='text' placeholder='Search odinbook' /></li>
        {/* mobile view */}
        <li className='logo-name mobile-view'><a href='#'><span className='name'>Odinbook</span></a></li>
        <li title='profile' className='mobile-view'><a href='#'><img className='account-img' src={userImage}/></a></li>
        <li title='settings' className='mobile-view setting ' onClick={() => setShowSettings(prev => !prev)}>
          <span className='material-symbols-outlined round-icon'>apps</span>
          <Dropdown setShowSettings={setShowSettings} showSettings={showSettings}/>
        </li>
      </div>

      <div className='middle'>
        <li title='home' className='active'><a href='#'><span className='material-symbols-outlined icon'>home</span></a></li>
        <li title='friends'><a href='#'><span className='material-symbols-outlined icon'>group</span></a></li>
        <li title='write post'><a href='#'><span className='material-symbols-outlined icon'>edit_square</span></a></li>
        {/* add link in mobile view */}
        <li title='notifications' className='mobile-view notifications' onClick={() => setShowNotifications(prev => !prev)}>
          <span className='material-symbols-outlined icon'>notifications</span>
          <Notifications setShowNotifications={setShowNotifications} showNotifications={showNotifications}/>
        </li>
      </div>

      <div className='last'>
      {/* mobile view */}
        <li className='search mobile-view'><span className='material-symbols-outlined search-icon'>search</span><input type='text' placeholder='Search odinbook' /></li>
        <li className='find-friends' title='search friends'><a href='#'>Find Friends</a></li>
      {/* desktop view  */}
        <li className='desktop-view setting' onClick={() => setShowSettings(prev => !prev)} tabIndex='0'>
          <span className='material-symbols-outlined round-icon'>apps</span>
          <Dropdown setShowSettings={setShowSettings} showSettings={showSettings}/>
        </li>
        <li title='profile' className='desktop-view'><a href='#'><img className='account-img' src={userImage}/></a></li>
        <li title='notifications' className='desktop-view notifications' onClick={() => setShowNotifications(prev => !prev)} tabIndex='0'>
          <span className='material-symbols-outlined round-icon'>notifications</span>
          <Notifications setShowNotifications={setShowNotifications} showNotifications={showNotifications}/>
        </li>
      </div>

    </nav>
  )
}

function Dropdown({setShowSettings, showSettings}) {
  return(
    <div className={`dropdown ${showSettings ? 'shown' : ''}`}>
      <div className='header'>
        <h2>Settings</h2>
        <span className="material-symbols-outlined round-icon"
          onClick={() => setShowSettings(true)} //setting value to true as it will be !true > > false by <li>'s onClick handler
        >
          close
        </span>
      </div>
      <div>
        <span className="material-symbols-outlined round-icon">bookmark_added</span>
        saved posts
        </div>
      <div>
        <span className="material-symbols-outlined round-icon">key</span>
        change passwords
      </div>
      <div>
        <span className="material-symbols-outlined round-icon">dark_mode</span>
        dark mode
      </div>
      <div>
        <span className="material-symbols-outlined round-icon">logout</span>
        log out
        </div>
    </div>
  )
}

function Notifications({setShowNotifications, showNotifications}) {
  // type: post liked / commented on post / post shared / unfriend
  // populate userId with name and img;
  let msgs = [
    {type: 'post_liked', user: {name:'John'}, postId:6},
    {type: 'comment_on_post', user: {name:'Sarah'}, postId:7},
    {type: 'post_shared', user: {name:'Heather'} , postId:8},
    {type: 'unfriend', user: {name:'Alex'}, postId:null}
  ];

  return(
    <div className={`notificatons-list ${showNotifications ? 'shown' : ''}`}>
      <div className='header'>
        <h2>Notifications</h2>
        <span className="material-symbols-outlined round-icon" 
          onClick={() => setShowNotifications(true)} //setting value to true as it will be !true > > false by <li>'s onClick handler
        >
          close
        </span>
      </div>
      {msgs.map((msg, i) => {
        switch(msg.type){
          case 'post_liked' : return <div key={i}>{msg.user.name} has liked your <a href='#'>post</a></div>; break;
          case 'comment_on_post' : return <div key={i}>{msg.user.name} has commneted on your <a href='#'>post</a></div>; break;
          case 'post_shared' : return <div key={i}>{msg.user.name} has shared a new <a href='#'>post</a></div>; break;
          case 'unfriend' : return <div key={i}>{msg.user.name} has unfriended removed you.</div>; break;
        }
      })}
    </div>
  )
}