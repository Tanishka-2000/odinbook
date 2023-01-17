import { useState } from "react"

export default function Login(){
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(true);
  // const [username, setusername] = useState('');
  // const [password, setPassword] = useState('');

  <span class="material-symbols-outlined">
  visibility_off
  </span>
  return(
    <div className='login-page'>
      <div className='hero-container'>
        <h1>odinbook</h1>
        <p>Odinbook helps you connect and share with people in life.</p>
      </div>
      { login ? 
      <div className='login-form'>
        <form>        
          <input id='username' type='text' placeholder='Email address' aria-label='Email address'/>   
          <input id='password' type={showPassword ? 'text' : 'password'} placeholder='password' aria-label='password'/>
          <span className='material-symbols-outlined showPassword' onClick={() => setShowPassword(prev => !prev)}>{showPassword ? 'visibility_off' : 'visibility'}</span>     
          <button type='submit' className='login-btn'>Log in</button>
        </form>
        <button className='signup-btn' onClick={() => setLogin(false)}>Create New Account</button>
      </div>
        :
      <div className='signup-form'>
        <form>        
          <input id='name' type='text' placeholder='Name' aria-label='Name'/>
          <input id='username' type='text' placeholder='Email address' aria-label='Eamil address'/>
          {/* <button type='button' onClick={() => setShowPassword(prev => !prev)}>show</button> */}
          <input id='password' type={showPassword ? 'text' : 'password'} placeholder='Password' aria-label='password'/>
          <button type='submit' className='signup-btn'>sign up</button>
          <p className='login-msg'>already have an account? <button type='button' onClick={() => setLogin(true)}>log in</button></p>
        </form> 
      </div>
      }
    </div>
  )
}
{/* value={username} onChange={e => setusername(e.target.value)}*/}
{/*value={password} onChange={e => setPassword(e.target.value)} */}