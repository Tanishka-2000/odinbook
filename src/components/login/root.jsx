import { useState } from "react";
import { Form, Outlet, redirect } from "react-router-dom";
// import FacebookLogin from 'react-facebook-login';
import './styles.css';

export async function loader(){
  let token = localStorage.getItem('token');
  if(!token) return redirect('/login');
  return null;
}

export default function Root(){
  // const [showPassword, setShowPassword] = useState(false);
  // const [login, setLogin] = useState(true);

  return(
    <div className='login-page'>
      <div className='hero-container'>
        <h1>odinbook</h1>
        <p>Odinbook helps you connect and share with people in life.</p>
      </div>
      <Outlet />
    </div>
  )
}

// const responseFacebook = response => console.log(response);

{/* <FacebookLogin
        appId="1199609287615763"
        autoLoad={true}
        fields="name,email,picture"    
        callback={responseFacebook} />  */}

        // { login ? 
          // <div className='login-form'>
          //   <Form method='post'>        
          //     <input id='username' type='text' placeholder='Email address' aria-label='Email address'/>   
          //     <input id='password' type={showPassword ? 'text' : 'password'} placeholder='password' aria-label='password'/>
          //     <span className='material-symbols-outlined showPassword' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? 'visibility_off' : 'visibility'}</span>     
          //     <button type='submit' className='login-btn'>Log in</button>
          //   </Form>
          //   <button className='signup-btn' onClick={() => setLogin(false)}>Create New Account</button>
            
          // </div>
        //     :
        //   <div className='signup-form'>
        //     <Form>        
        //       <input id='name' type='text' placeholder='Name' aria-label='Name'/>
        //       <input id='username' type='text' placeholder='Email address' aria-label='Eamil address'/>
              
        //       <input id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' aria-label='password'/>
        //       {/* <span className='material-symbols-outlined showPassword' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? 'visibility_off' : 'visibility'}</span>     
        //        */}
        //       <button type='submit' className='signup-btn'>sign up</button>
        //       <p className='login-msg'>already have an account? <button type='button' onClick={() => setLogin(true)}>log in</button></p>
        //     </Form> 
        //   </div>
        //   }