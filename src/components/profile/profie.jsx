import './styles.css';
import Post from '../post/post';
import { Await, defer, Link, useLoaderData } from 'react-router-dom';
import { SkeletonPosts } from '../home/home';
import { Suspense } from 'react';

async function getProfile(url){
  const response = await fetch(url,{
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  return data;
}

export async function profileLoader(){
  // const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/about',{
  //   method: 'get',
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   }
  // });
  // if(response.status >= 400) return redirect('/login');
  // const data = await response.json();
  // // console.log(data);
  // return data;
  let data = getProfile('https://odinbook-api-1dl4.onrender.com/protected/about');
  return defer({data});
}

export async function friendProfileLoader({params}){
  // const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/users/${params.userId}`,{
  //   method: 'get',
  //   headers: {
  //     Authorization: `Bearer ${localStorage.getItem('token')}`
  //   }
  // });
  // if(response.status >= 400) return redirect('/login');
  // const data = await response.json();
  // // console.log(data);
  // return data;
  let data = getProfile(`https://odinbook-api-1dl4.onrender.com/protected/users/${params.userId}`);
  return defer({data});
}

export default function Profile({isCurrentUser}){

  const {data} = useLoaderData();
  return(
    <>
      <Suspense fallback={<SkeletonProfile/>}>
      <Await resolve={data}>
          {(resolvedData) => <>
          <div className='profile'>
          
              <div className='profile-image'>
                <img src={resolvedData.image} />
              </div>

              <div className='name'>
                <h1>{resolvedData.name}</h1>
              </div>

                {
                  isCurrentUser ? 
                  <Link to='/edit-profile' className='edit-btn'>
                    <span className='material-symbols-outlined'>edit</span>
                    Edit Profile
                  </Link>
                  : ''
                }

              <div className='bio'>
                <div>
                  <span className='material-symbols-outlined'>home_work</span>
                  {resolvedData.profile.currentCity ? 
                    <p>Currently living in {resolvedData.profile.currentCity}</p>
                    :
                    <p>Current Town or City</p>
                  }
                </div>

                <div>
                  <span className='material-symbols-outlined'>work</span>
                  {resolvedData.profile.workExperience.length > 0 ?
                    <p>{resolvedData.profile.workExperience.map(work => (work + ' '))}</p>
                    :
                    <p>work Experience</p>
                  }
                </div>

                <div>
                  <span className='material-symbols-outlined'>school</span>
                  {(resolvedData.profile.highSchool.length > 0 || resolvedData.profile.college.length > 0) ? 
                    <p>{resolvedData.profile.highSchool.length > 0 ? `went to ${resolvedData.profile.highSchool.join(', ')}`: ''} <br />
                      {resolvedData.profile.college.length > 0 ? `studied at ${resolvedData.profile.college.join(', ')}`: ''}
                    </p>
                    :
                    <p>School or University</p>
                  }        
                </div>

                <div>
                  <span className='material-symbols-outlined'>location_on</span>
                  {resolvedData.profile.homeTown ? 
                    <p>Home Town {resolvedData.profile.currentCity}</p>
                    :
                    <p>Home Town</p>
                  }
                </div>

                <div>
                  <span className='material-symbols-outlined'>favorite</span>
                  {resolvedData.profile.relationshipStatus ? 
                    <p>{resolvedData.profile.relationshipStatus}</p>
                    :
                    <p>Relationship Status</p>
                  }
                </div>
              </div>
            {/* <Link to='/' className='see-friends-btn'>
              <span className='material-symbols-outlined'>group</span>
              See Friends
            </Link> */}
            </div>

            
            <div className='posts'>
            <h2>Posts</h2>
              {resolvedData.posts.map(post => <Post key={post._id} post={post}/>)}
            </div>
            </>
            }
        </Await>  
      </Suspense>
   </>
  )
}

export function SkeletonProfile(){
  return(
    <>
      <div className='skeleton-profile'>

        <div className='skeleton-photo'></div>

        <div className='skeleton-profile-data'>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <div className='skeleton-posts'>
        <SkeletonPosts />
      </div>
    </>
  )
}