import { redirect, useLoaderData, Link } from 'react-router-dom';
// import image1 from '../../images/image1.jpg';
// import image2 from '../../images/image2.jpg';
// import image3 from '../../images/image3.jpg';
import Post from '../post/post.jsx';
import './styles.css';
// import Profile from '../profile/profie';
// import Users from '../users/users';
// import EditProfile from '../editProfileForm/editProfile';

export async function homeLoader(){
  
  const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/',{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function savedPostsLoader(){
  
  const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/saved-posts',{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  // console.log(data);
  return data;
}

export async function postLoader({params}){
  
  const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/posts/${params.postId}`,{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  // console.log(data);
  return [data];
}

export default function Home({saved}){

  const posts = useLoaderData();
  return(
    <div className='home'>
      {
        saved ? <h1 className='header'>Saved Posts</h1> :
        <div className='write'>
          <Link to='/write' className='add'>
            <span className="material-symbols-outlined">add</span>
          </Link>
          <div>
            <p className='bold'>Create Story</p>
            <p>Share a photo or write something.</p>
          </div>
        </div>
      }
      {posts.map(post => <Post key={post._id} post={post} saved={saved}/>)}
    </div>
  )
}