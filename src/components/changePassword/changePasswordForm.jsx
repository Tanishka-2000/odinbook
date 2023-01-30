import './styles.css';
import { Form, redirect } from 'react-router-dom';
import { useState } from 'react';

export async function changePasswordAction({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const response = fetch('http://localhost:3000/protected/change-password',{
    method: 'put',
    headers: {
      'Content-Type': 'application/JSON',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  })

  return redirect('/')
}

export default function ChangePasswordForm(){
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  return(
    <div className='changePassword'>
    <h1>Change Password</h1>
      <Form method='post'>
        <div>
          <input       
            type={showOldPassword ? 'text' : 'password'}
            placeholder='Old Password'
            aria-label='Old Password'
            name='old'
          />
          <button
            className='visibility-btn'
            type='button'
            aria-label={`made password ${showOldPassword ? 'visibile': 'invisible'}`}
          >
            <span
              className='material-symbols-outlined'
              onClick={() => setShowOldPassword(prev => !prev)}
            >
            {showOldPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        <div>
          <input       
            type={showNewPassword ? 'text' : 'password'}
            placeholder='New Password'
            aria-label='New Password'
            name='new'
          />

          <button
            className='visibility-btn'
            type='button'
            aria-label={`made password ${showNewPassword ? 'visibile': 'invisible'}`}
          >
            <span
              className='material-symbols-outlined'
              onClick={() => setShowNewPassword(prev => !prev)}
            >
            {showNewPassword ? 'visibility_off' : 'visibility'}
            </span>
          </button>
        </div>

        <button type='submit'>change</button>
      </Form>
    </div>
  )
}