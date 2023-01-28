import { redirect, useLoaderData } from 'react-router-dom';
// import image1 from '../../images/image1.jpg';
// import image2 from '../../images/image2.jpg';
// import image3 from '../../images/image3.jpg';
import Post from '../post/post.jsx';
import './styles.css';
// import Profile from '../profile/profie';
// import Users from '../users/users';
// import EditProfile from '../editProfileForm/editProfile';

export async function loader(){
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3000/protected/',{
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  console.log(data);
  return data;
}

export default function Home(){

  const posts = useLoaderData();
  return(
    <div className='home'>
    {/* on cliking add button should display new post form*/}
      <div className='write'>
        <span className="material-symbols-outlined add-btn">add</span>
        <div>
          <p className='bold'>Create Story</p>
          <p>Share a photo or write something.</p>
        </div>
      </div>
      {posts.map(post => <Post key={post._id} data={post}/>)}
    </div>
  )
}