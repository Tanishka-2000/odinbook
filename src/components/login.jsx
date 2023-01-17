import { useState } from "react"

export default function Login(){
  const [showPassword, setShowPassword] = useState(false);
  const [login, setLogin] = useState(true);
  // const [username, setusername] = useState('');
  // const [password, setPassword] = useState('');

   
  return(
    <div className='login-page'>
      <div className='hero-container'>
        <h1>odinbook</h1>
        <p>Odinbook helps you connect and share with people in life.</p>
      </div>
      { login ? 
      <div className='login-form'>
        <form>
          
          <input id='username' type='text' placeholder='Email address'/>
    
          <input id='password' type={showPassword ? 'text' : 'password'} placeholder='password'/>
          {/* <span class="material-symbols-outlined">visibility</span> */}
       
          <button type='submit' className='login-btn'>Log in</button>

        </form>
        <button className='signup-btn' onClick={() => setLogin(false)}>Create New Account</button>
      </div>
        :
      <div className='signup-form'>
        <form>
          <div className='form-group'>
            <label htmlFor='name'>Name</label>
            <input id='name' type='text'/>
          </div>

          <div className='form-group'>
            <label htmlFor='username'>Email</label>
            <input id='username' type='text'/>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Password  <button type='button' onClick={() => setShowPassword(prev => !prev)}>show</button> </label>
            <input id='password' type={showPassword ? 'text' : 'password'} />
          </div>

        </form> 
      </div>
      }
    </div>
  )
}
{/* value={username} onChange={e => setusername(e.target.value)}*/}
{/*value={password} onChange={e => setPassword(e.target.value)} */}