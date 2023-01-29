import './styles.css';
// import userImage from '../../images/user.jpg';
// import cat2 from '../../images/cat2.jpg';
import Post from '../post/post';
import { useLoaderData } from 'react-router-dom';

export async function profileLoader(){
  const response = await fetch('http://localhost:3000/protected/about',{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Profile(){

  const data = useLoaderData();
  return(
    <div className='profile'>

      <div className='profile-image'>
        <img src={data.image} />
        <button className='change-photo'><span className='material-symbols-outlined camera'>photo_camera</span></button>
      </div>

      <div className='name'>
        <h1>{data.name}</h1>
        {/* <p>In a cat's eye all things belong to cats.</p> */}
      </div>

      <button className='edit-btn'>
        <span className='material-symbols-outlined'>edit</span>
        Edit Profile
      </button>

      <div className='bio'>
        <div>
          <span className='material-symbols-outlined'>home_work</span>
          {data.profile.currentCity ? 
            <p>Currently living in {data.profile.currentCity}</p>
            :
            <p>Current Town or City</p>
          }
        </div>

        <div>
          <span className='material-symbols-outlined'>work</span>
          {data.profile.workExperience.length > 0 ?
            <p>{data.profile.workExperience.map(work => (work + ' '))}</p>
            :
            <p>work Experience</p>
          }
        </div>

        <div>
          <span className='material-symbols-outlined'>school</span>
          {(data.profile.highSchool.length > 0 || data.profile.college.length > 0) ? 
            <p>{data.profile.highSchool.length > 0 ? `went to ${data.profile.highSchool.join(', ')}`: ''} <br />
              {data.profile.college.length > 0 ? `studied at ${data.profile.college.join(', ')}`: ''}
            </p>
            :
            <p>School or University</p>
          }        
        </div>

        <div>
          <span className='material-symbols-outlined'>location_on</span>
          {data.profile.homeTown ? 
            <p>Home Town {data.profile.currentCity}</p>
            :
            <p>Home Town</p>
          }
        </div>

        {/* <div>
          <span className='material-symbols-outlined'>favorite</span>
          {data.profile.homeTown ? 
            <p>{data.profile.currentCity}</p>
            :
            <p>Home Town</p>
          }
        </div> */}
      </div>

      <button className='see-friends-btn'>
        <span className='material-symbols-outlined'>group</span>
        See Friends
      </button>
      
      <div className='posts'>
        {data.posts.map(post => <Post key={post._id} post={post}/>)}
      </div>
    </div>
  )
}