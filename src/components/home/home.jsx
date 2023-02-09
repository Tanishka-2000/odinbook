import { Suspense } from 'react';
import { redirect, useLoaderData, Link, Await, defer } from 'react-router-dom';
import Post from '../post/post.jsx';
import './styles.css';

// function accepts parameter 'singlePost -> true/false' because, Home component render array of post,
// and defer function can not return [posts]
async function getPosts(url, singlePost){
  const response = await fetch(url,{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  return (singlePost ? [data] : data);
}

// loads all user's and his/her friends' posts
export async function homeLoader(){
  let posts = getPosts('https://odinbook-api-1dl4.onrender.com/protected/', false);
  return defer({posts});
}

// loads user's saved posts
export async function savedPostsLoader(){
  let posts = getPosts('https://odinbook-api-1dl4.onrender.com/protected/saved-posts', false)
  return defer({posts});
}

// load single post
export async function postLoader({params}){
  let posts = getPosts(`https://odinbook-api-1dl4.onrender.com/protected/posts/${params.postId}`, true)
  return defer({posts});
}

// accepts 'saved -> true/false, as it does not render link to /write route if its /saved-posts route
export default function Home({saved}){

  const {posts} = useLoaderData();
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
      
      <Suspense fallback={<SkeletonPosts />}>
        <Await resolve={posts}>
          {(resolvedPosts) => 
            <>
            {resolvedPosts.map(post => <Post key={post._id} post={post} saved={saved}/>)}
            </>
          } 
        </Await>  
      </Suspense>
    </div>
  )
}

// skeleton UI for post
export function SkeletonPosts(){
  return(
    <>
    <div className='skeleton-post'>
      <div className='skeleton-header'>

        <div className='skeleton-user-image'></div>

        <div className='skeleton-user-data'>
          <div className='skeleton-user-name'></div>
          <div className='skeleton-post-date'></div>
        </div>
        
      </div>  
    
      <div className='skeleton-post-title'></div>
      <div className='skeleton-post-image'></div>

      <div className='skeleton-btn-group'>
        <div></div>
        <div></div>
      </div>    
    </div>

    <div className='skeleton-post'>
      <div className='skeleton-header'>

        <div className='skeleton-user-image'></div>

        <div className='skeleton-user-data'>
          <div className='skeleton-user-name'></div>
          <div className='skeleton-post-date'></div>
        </div>
        
      </div>  
    
      <div className='skeleton-post-title'></div>
      <div className='skeleton-post-image'></div>

      <div className='skeleton-btn-group'>
        <div></div>
        <div></div>
      </div>    
    </div>

    <div className='skeleton-post'>
      <div className='skeleton-header'>

        <div className='skeleton-user-image'></div>

        <div className='skeleton-user-data'>
          <div className='skeleton-user-name'></div>
          <div className='skeleton-post-date'></div>
        </div>
        
      </div>  
    
      <div className='skeleton-post-title'></div>
      <div className='skeleton-post-image'></div>

      <div className='skeleton-btn-group'>
        <div></div>
        <div></div>
      </div>    
    </div>  
  </>
  )
}