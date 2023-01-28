import { Form, Link, redirect, useActionData } from "react-router-dom"
import { useState } from "react";

export async function action({request}){
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);
  // console.log(credentials);
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'post',
    headers:{
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify(credentials)
  });

  const data = await response.json();
  
  if(response.status >= 400) {
    const err = {};
    data.forEach(error => {
      err[error.param] = error.msg;
    });
    return {credentials, err};
  }

  localStorage.setItem('token', data.token);
  localStorage.setItem('avatar', data.image);
  // console.log(data);
  return redirect('/');
}

export default function Login(){
  const [showPassword, setShowPassword] = useState(false);
  const data = useActionData();

  return(
    <div className='login-page'>
      <div className='hero-container'>
        <h1>odinbook</h1>
        <p>Odinbook helps you connect and share with people in life.</p>
      </div>
    
      <div className='login-form'>
        <Form method='post'>  

          <input id='email' name='email' type='text' placeholder='Email address' aria-label='Email address'defaultValue={data ? data.credentials.email : ''}/>
          {data ? data.err.email ? <p className='error'>{data.err.email}</p> : '' : ''}
         
          <div className='password-container'>
            <input id='password' name='password' type={showPassword ? 'text' : 'password'} placeholder='password' aria-label='password'/>
            <span className='material-symbols-outlined showPassword' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? 'visibility_off' : 'visibility'}</span>
          </div>
          {data ? data.err.password ? <p className='error'>{data.err.password}</p> : '' : ''}     
          
          <button type='submit' className='login-btn'>Log in</button>
        
        </Form>
        <Link to='/signup'><button className='signup-btn'>Create New Account</button></Link>    
      </div>
    </div>  
  )
}