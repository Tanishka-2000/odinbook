import { Suspense } from 'react';
import { Await, defer, Form, redirect, useLoaderData, useNavigate } from 'react-router-dom';
import './styles.css';


async function getprofile(){
  const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/profile', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  const data = await response.json();
  return data;
}

export async function loadProfileData(){
  let profile = getprofile();
  return defer({profile});
}

export async function profileAction({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  delete data['field'];
  console.log(data);
  const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/profile/${formData.get('field')}`,{
    method: 'put',
    headers: {
      'Content-Type': 'application/JSON',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return null;
}

export async function deleteProfile({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  delete data['field'];
  // console.log(data);
  const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/profile/${formData.get('field')}`,{
    method: 'delete',
    headers: {
      'Content-Type': 'application/JSON',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return redirect('/edit-profile');
}

export default function EditProfile(){

  const {profile} = useLoaderData();
  const navigate = useNavigate();
  
  return(
    <Suspense fallback={<SkeletonEditProfile />}>
    <Await resolve={profile}>
    {(resolvedProfile) => 
    <div className='edit-profile'>

      <div className='header'> 
        <button aria-label='close button' onClick={() => navigate(-1)}><span className="material-symbols-outlined back">arrow_back</span></button>
        <h2>About</h2>
      </div>

      <div className='avatar'>
        <h3>Profile picture </h3>
        <div>
          <span className="material-symbols-outlined">person</span>
          <Form method='post' >
            <input type='hidden' name='field' value='image' />
            <input type='text' name='image' placeholder='Add image Url' aria-label='Add image Url'/>
          </Form>
        </div>  
      </div>

     <div className='work'>
        <h3>work</h3>
        <div>
          <span className="material-symbols-outlined">business_center</span>
          <Form method='post'>
            <input type='hidden' name='field' value='work-experience' />
            <input type='text' name='experience' placeholder='Add Work Experience' aria-label='Add Work Experience'/>
          </Form>
        </div>
        {resolvedProfile.workExperience.map((experience, i) => 
          <li key={i}>
            <span className="material-symbols-outlined">business_center</span>
            {experience}
            <Form method='post' action='/edit-profile/delete'>
              <input type='hidden' name='field' value='work-experience' />
              <button className='delete'
                name='experience'
                value={experience}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </Form>  
          </li>
        )}
        
     </div>

     <div className='education'>
      <h3>Education</h3>
        <div>
          <span className="material-symbols-outlined">school</span>
          <Form method='post'>
            <input type='hidden' name='field' value='high-school' />
            <input type='text' name='school' placeholder='Add College/University' aria-label='Add College/University'/>
          </Form>
        </div>

        <div>
          <span className="material-symbols-outlined">apartment</span>
          <Form method='post'>
            <input type='hidden' name='field' value='college' />
            <input type='text' name='college' placeholder='Add Secondary School' aria-label='Add Secondary School'/>
          </Form>
        </div>
 
      {resolvedProfile.highSchool.map((school, i) => 
        <li key={i}>
          <span className="material-symbols-outlined">school</span>
          went to {school}
          <Form method='post' action='/edit-profile/delete'>
            <input type='hidden' name='field' value='high-school' />
            <button className='delete'
              name='school'
              value={school}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </Form> 
        </li>
      )}
      
      {resolvedProfile.college.map((school, i) => 
        <li key={i}>
          <span className="material-symbols-outlined">school</span>
          studied at {school}
          <Form method='post' action='/edit-profile/delete'>
            <input type='hidden' name='field' value='college' />
            <button className='delete'
              name='college'
              value={school}>
              <span className="material-symbols-outlined">delete</span>
            </button>
          </Form>          
        </li>
      )}

     </div>

     <div className='places-lived'>
        <h3>Places Lived</h3>
        <div>
          <span className="material-symbols-outlined">home_work</span>
          <Form method='post'>
            <input type='hidden' name='field' value='currentCity' />
            <input type='text'
              name='city'
              placeholder='Add Current Town/City'
              aria-label='Add Current Town/City'
              defaultValue={resolvedProfile.currentCity}  
            />
          </Form>
        </div>

        <div>
          <span className="material-symbols-outlined">location_on</span>
          <Form method='post'>
            <input type='hidden' name='field' value='homeTown' />
            <input type='text'
              name='town'
              placeholder='Add Home Town'
              aria-label='Add Home Town'
              defaultValue={resolvedProfile.homeTown}
            />
          </Form>
        </div>

     </div>
     <div className='contact-info'>
        <h3>Contact info</h3>
        <div>
          <span className="material-symbols-outlined">call</span>
          <Form method='post'>
            <input type='hidden' name='field' value='phone' />
            <input type='text' name='phone' placeholder='Add contact number' aria-label='Add contact number'/>
          </Form>
        </div>

        <div>
          <span className="material-symbols-outlined">mail</span>
          <Form method='post'>
            <input type='hidden' name='field' value='email' />
            <input type='text' name='email' placeholder='Add email' aria-label='Add email'/>
          </Form>
        </div>

        {resolvedProfile.contactInfo.email.map((em, i) => 
          <li key={i}>
            <span className="material-symbols-outlined">mail</span>
            {em}
            <Form method='post' action='/edit-profile/delete'>
              <input type='hidden' name='field' value='email' />
              <button className='delete'
                name='email'
                value={em}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </Form>
          </li>
        )}

        {resolvedProfile.contactInfo.phone.map((ph, i) => 
          <li key={i}>
            <span className="material-symbols-outlined">call</span>
            {ph}
            <Form method='post' action='/edit-profile/delete'>
              <input type='hidden' name='field' value='phone' />
              <button className='delete'
                name='phone'
                value={ph}>
                <span className="material-symbols-outlined">delete</span>
              </button>
            </Form>
          </li>
        )}

     </div>

     <div className='basic-info'>
        <h3>Basic info</h3>
        <div>
          <span className="material-symbols-outlined">{resolvedProfile.gender == 'male' ? 'man' : 'woman'}</span> {/*woman*/}
          <Form method='post'>
            <input type='hidden' name='field' value='gender' />
            <input type='text'
              name='gender'
              placeholder='Add Gender'
              aria-label='Add Gender'
              defaultValue={resolvedProfile.gender}
            />
          </Form>
        </div>

        <div>
          <span className="material-symbols-outlined">cake</span>
          <Form method='post'>
            <input type='hidden' name='field' value='birthDate' />
            <input type='text'
              name='date'
              placeholder='Add Date of Birth'
              aria-label='Add Date of Birth'
              defaultValue={new Date(resolvedProfile.birthDate).toDateString().slice(4)}
              />
          </Form>
        </div>
      </div>  
    </div>
    }
    </Await>
  </Suspense>
  )
}

function SkeletonEditProfile(){
  return(
    <div className='edit-profile'>

      <div className='header'> 
        <button aria-label='close button' onClick={() => navigate(-1)}><span className="material-symbols-outlined back">arrow_back</span></button>
        <h2>About</h2>
      </div>

      <div className='avatar'>
        <h3>Profile picture </h3>
        <div>
          <span className="material-symbols-outlined">person</span>
          <div className='skeleton-edit'></div>
        </div>  
      </div>

      <div className='work'>
        <h3>work</h3>
        <div>
          <span className="material-symbols-outlined">business_center</span>
          <div className='skeleton-edit'></div>
        </div>      
      </div>


    <div className='education'>
      <h3>Education</h3>
        <div>
          <span className="material-symbols-outlined">school</span>
          <div className='skeleton-edit'></div>
        </div>

        <div>
          <span className="material-symbols-outlined">apartment</span>
          <div className='skeleton-edit'></div>
        </div>
      </div>

      <div className='places-lived'>
        <h3>Places Lived</h3>
        <div>
          <span className="material-symbols-outlined">home_work</span>
          <div className='skeleton-edit'></div>          
        </div>

        <div>
          <span className="material-symbols-outlined">location_on</span>
          <div className='skeleton-edit'></div>
        </div>
      </div>

     <div className='contact-info'>
        <h3>Contact info</h3>
        <div>
          <span className="material-symbols-outlined">call</span>
          <div className='skeleton-edit'></div>
        </div>

        <div>
          <span className="material-symbols-outlined">mail</span>
          <div className='skeleton-edit'></div>
        </div>
      </div>  

      <div className='basic-info'>
        <h3>Basic info</h3>
        <div>
          <span className="material-symbols-outlined">man</span> {/*woman*/}
          <div className='skeleton-edit'></div>
        </div>

        <div>
          <span className="material-symbols-outlined">cake</span>
          <div className='skeleton-edit'></div>
        </div>
      </div> 

    </div>
  )
}