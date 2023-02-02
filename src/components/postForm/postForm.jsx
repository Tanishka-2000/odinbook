import { Form, redirect, useActionData, useNavigate } from 'react-router-dom';
import './styles.css';


export async function postFormAction({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  // console.log(data);

  let response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/posts',{
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });

  console.log(response);
  if(response.status >= 400){
    response = await response.json();
    return response;
  }

  return redirect('/');
}

export default function PostForm(){

  const error = useActionData();
  const navigate = useNavigate();

  return(
    <div className='new-post'>
      {/* <div className='container'> */}
        <div className='header'>
          <p className='heading'>Create Post</p>
          <button
            aria-label='close button'
            className=' close-btn'
            onClick={() => navigate(-1)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className='user'>
          <img src={localStorage.getItem('avatar')} />
          <p className='bold'>{localStorage.getItem('name')}</p>
        </div>

        <Form method='post'>
          <textarea rows='4' name='message' aria-label='write your message here' placeholder={`What's on your mind, ${localStorage.getItem('name')} ?`}></textarea>
          <input type='text' name='imageUrl' aria-label='Image URL' placeholder='add image url'/>
          <input  type='text' name='tags' aria-label='tags' placeholder='add tags'/>
          <button>Post</button>
        </Form>

        {error ? <p className='error'>{error.msg}</p> : ''}
      {/* </div> */}
    </div>  
  )
}