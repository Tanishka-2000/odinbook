import './styles.css';
import { useState } from 'react';
import { Form , Link, redirect, useActionData} from 'react-router-dom';

export async function action({request}){
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  const response = await fetch('http://localhost:3000/api/signup', {
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
  // console.log(data);
  return redirect('/');
}

export default function Signup(){
  const [showPassword, setShowPassword] = useState(false);
  const data = useActionData();

  return(
    <div className='login-page'>
      <div className='hero-container'>
        <h1>odinbook</h1>
        <p>Odinbook helps you connect and share with people in life.</p>
      </div>
    
      <div className='signup-form'>
        <Form method='post'>        
          <input id='name' name='name' type='text' placeholder='Your Full Name' aria-label='Name' defaultValue={data ? data.credentials.name : ''}/>
          {data ? data.err.name ? <p className='error'>{data.err.name}</p> :'' : ''}

          <input id='username' name='email' type='text' placeholder='Email address' aria-label='Eamil address' defaultValue={data ? data.credentials.email : ''}/>
          {data ? data.err.email ? <p className='error'>{data.err.email}</p> :'' : ''}

          <div className='password-container'>
            <input id='password' name='password' type={showPassword ? 'text' : 'password'} placeholder='Password' aria-label='password'/>
            <span className='material-symbols-outlined showPassword' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? 'visibility_off' : 'visibility'}</span>     
          </div>
          {data ? data.err.password ? <p className='error'>{data.err.password}</p> :'' : ''}

          <button type='submit' className='signup-btn'>sign up</button>
        </Form> 
        <p className='login-msg'>already have an account? <Link to='/login' type='button'>log in</Link></p>
      </div>
    </div>
)}

// const responseFacebook = response => console.log(response);

{/* <FacebookLogin
        appId="1199609287615763"
        autoLoad={true}
        fields="name,email,picture"    
        callback={responseFacebook} />  */}
