import { Form, redirect } from 'react-router-dom';
import './styles.css';


export async function postFormAction({request}){
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  console.log(data);
  let response = await fetch('http://localhost:3000/protected/posts',{
    method: 'post',
    headers: {
      'Content-Type': 'application/JSON',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(data)
  });
  // somethings wrong
  if(response.status >= 400) return null;
  return redirect('/');
}

export default function PostForm(){
  return(
    <div className='new-post'>
      {/* <div className='container'> */}
        <p className='heading'>Create Post</p>
        <span className="material-symbols-outlined close-btn" aria-label='close button'>close</span>
        <div className='user'>
          <img src={localStorage.getItem('avatar')} />
          <p className='bold'>{localStorage.getItem('name')} Snow White</p>
        </div>
        <Form method='post'>
          <textarea rows='4' name='message' aria-label='write your message here' placeholder={`What's on your mind, ${localStorage.getItem('name')} ?`}></textarea>
          <input type='text' name='imageUrl' aria-label='Image URL' placeholder='add image url'/>
          <input  type='text' name='tags' aria-label='tags' placeholder='add tags'/>
          <button>Post</button>
        </Form>
      {/* </div> */}
    </div>  
  )
}