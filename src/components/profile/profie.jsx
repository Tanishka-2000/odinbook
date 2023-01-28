import './styles.css';
import userImage from '../../images/user.jpg';
import cat2 from '../../images/cat2.jpg';
import Post from '../post/post';

export default function Profile(){
  return(
    <div className='profile'>

      <div className='profile-image'>
        <img src={userImage} />
        <button className='change-photo'><span className='material-symbols-outlined camera'>photo_camera</span></button>
      </div>

      <div className='name'>
        <h1>Snow White</h1>
        <p>In a cat's eye all things belong to cats.</p>
      </div>

      <button className='edit-btn'>
        <span className='material-symbols-outlined'>edit</span>
        Edit Profile
      </button>

      <div className='bio'>
        <div>
          <span className='material-symbols-outlined'>home_work</span>
          <p>Current Town or City</p>
        </div>

        <div>
          <span className='material-symbols-outlined'>work</span>
          <p>Workplace</p>
        </div>

        <div>
          <span className='material-symbols-outlined'>school</span>
          <p>School or University</p>
        </div>

        <div>
          <span className='material-symbols-outlined'>location_on</span>
          <p>Home Town</p>
        </div>

        <div>
          <span className='material-symbols-outlined'>favorite</span>
          <p>Relationship status</p>
        </div>
      </div>

      <button className='see-friends-btn'>
        <span className='material-symbols-outlined'>group</span>
        See Friends
      </button>
      
      <div className='posts'>
        <Post img={cat2}/>
        <Post img={cat2}/>
      </div>
    </div>
  )
}