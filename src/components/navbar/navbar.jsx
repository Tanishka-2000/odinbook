import './navbar.css';
export default function Navbar(){
  return(
    <nav>

      <div className='first'>
      {/* shown in desktop view */}
        <li className='logo desktop-view'><a href='#'><span className='symbol'>B</span></a></li>
        <li className='search desktop-view'><span className='material-symbols-outlined search-icon'>search</span><input type='text' placeholder='Search odinbook' /></li>
      {/* shown in mobile view */}
        <li className='logo-name mobile-view'><a href='#'><span className='name'>Odinbook</span></a></li>
        <li title='profile' className='mobile-view'><a href='#'><span className='material-symbols-outlined round-icon'>person</span></a></li>
        <li title='settings' className='mobile-view'><a href='#'><span className='material-symbols-outlined round-icon'>apps</span></a></li>
      </div>


      <div className='middle'>
        <li title='home' className='active'><a href='#'><span className='material-symbols-outlined icon'>home</span></a></li>
        <li title='friends'><a href='#'><span className='material-symbols-outlined icon'>group</span></a></li>
        <li title='write post'><a href='#'><span className='material-symbols-outlined icon'>edit_square</span></a></li>
        <li title='notifications mobile-view'><a><span className='material-symbols-outlined round-icon'>notifications</span></a></li>
      </div>

      <div className='last'>
        <li className='search mobile-view'><span className='material-symbols-outlined search-icon'>search</span><input type='text' placeholder='Search odinbook' /></li>
        <li className='find-friends' title='search friends'><a href='#'>Find Friends</a></li>
        <li title='profile' className='desktop-view'><a href='#'><span className='material-symbols-outlined round-icon'>person</span></a></li>
        <li title='settings' className='desktop-view'><a href='#'><span className='material-symbols-outlined round-icon'>apps</span></a></li>
        <li title='notifications' className='desktop-view'><a><span className='material-symbols-outlined round-icon'>notifications</span></a></li>
      </div>

    </nav>
  )
}