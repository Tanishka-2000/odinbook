import { Form, useLoaderData } from 'react-router-dom';
import './styles.css';

export async function loadProfileData(){
  const response = await fetch('http://localhost:3000/protected/profile', {
    method: 'get',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  
  const data = await response.json();
  return data;
}

export async function profileAction({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  delete data['field'];
  console.log(data);
  const response = await fetch(`http://localhost:3000/protected/profile/${formData.get('field')}`,{
    method: 'put',
    headers: {
      'Content-Type': 'application/JSON',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  return null;
}

export default function EditProfile(){

  const profile = useLoaderData();
  // console.log(profile);
  return(
    <div className='edit-profile'>

      <div className='header'> 
        <button aria-label='close button'><span className="material-symbols-outlined back">arrow_back</span></button>
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
        {profile.workExperience.map((experience, i) => 
          <li key={i}>
            <span className="material-symbols-outlined">business_center</span>
            {experience}
            <button className='delete'><span className="material-symbols-outlined">delete</span></button>
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
 
      {profile.highSchool.map((school, i) => 
        <li key={i}>
          <span className="material-symbols-outlined">school</span>
          went to {school}
          <button className='delete'><span className="material-symbols-outlined">delete</span></button>
        </li>
      )}
      
      {profile.college.map((school, i) => 
        <li key={i}>
          {/* <Form method='post'> */}
            <span className="material-symbols-outlined">school</span>
            studied at {school}
            <button className='delete'><span className="material-symbols-outlined">delete</span></button>
          {/* </Form> */}
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
              defaultValue={profile.currentCity}  
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
              defaultValue={profile.homeTown}
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

        {profile.contactInfo.email.map((em, i) => 
          <li key={i}>
            <span className="material-symbols-outlined">mail</span>
            {em}
            <button className='delete'><span className="material-symbols-outlined">delete</span></button>
          </li>
        )}

        {profile.contactInfo.phone.map((ph, i) => 
          <li key={i}>
            <span className="material-symbols-outlined">call</span>
            {ph}
            <button className='delete'><span className="material-symbols-outlined">delete</span></button>
          </li>
        )}

     </div>

     <div className='basic-info'>
        <h3>Basic info</h3>
        <div>
          <span className="material-symbols-outlined">{profile.gender == 'male' ? 'man' : 'woman'}</span> {/*woman*/}
          <Form method='post'>
            <input type='hidden' name='field' value='gender' />
            <input type='text'
              name='gender'
              placeholder='Add Gender'
              aria-label='Add Gender'
              defaultValue={profile.gender}
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
              defaultValue={new Date(profile.birthDate).toDateString().slice(4)}
              />
          </Form>
        </div>
      </div>  
    </div>
  )
}