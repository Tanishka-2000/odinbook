import './styles.css';
import {Form, redirect, useLoaderData, Link, Await, defer} from 'react-router-dom';
import { Suspense, useState } from 'react';


async function getRequests(){
  const response = await fetch('https://odinbook-api-1dl4.onrender.com/protected/requests',{
    method: 'get',
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  
  let sent = [], recieved = [];
  data.forEach(request => {
    if(request.domain == 'sent') sent = [...sent, request];
    else recieved = [...recieved, request];
  });
  return {sent, recieved};
}

export async function requestsLoader(){
  let data = getRequests();
  return defer({data});
}

export async function deleteRequest({request}){
  const formData = await request.formData();
  
  if(formData.get('actionType') == 'delete'){
    const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/requests/${formData.get('requestId')}`,{
      method: 'delete',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }else{
    const answer = formData.get('actionType');
    const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/requests/${formData.get('requestId')}`,{
      method: 'post',
      headers: {
        'Content-Type': 'application/JSON',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({answer})
    });
    console.log(response);
  }
 
  return null;
}

export default function Requests(){
  const [sentRequests, setSentRequests] = useState(true);
  const {data} = useLoaderData();
  
  return(
    <div className='requests'>
      <div className='switch-btns'>
        <button onClick={() => setSentRequests(true)}>Sent Requests</button>
        <button onClick={() => setSentRequests(false)}>Recived Request</button>
      </div>
      {sentRequests ? 
        <div>
          <h1 className='header'>Sent Requests</h1>
          <Suspense fallback={<SkeletonSentRequests />}>
            <Await resolve={data}>
              {(resolvedRequest) => 
                <>
                  {resolvedRequest.sent.map(request => <SentRequest key={request._id} request={request}/>)}
                </>
              }
            </Await>
          </Suspense>
        </div>
        :
        <div>
          <h1 className='header'>Recieved Requests</h1>
          <Suspense fallback={<SkeletonSentRequests />}>
            <Await resolve={data}>
              {(resolvedRequest) => 
                <>
                {resolvedRequest.recieved.map(request => <RecivedRequest key={request._id} request={request} />)}
                </>
              }
            </Await>
          </Suspense>
          
        </div>
      }  
    </div>
  )
}

function SentRequest({request}){
  return(
    <div className='sent'>
      <div className='name'>
        <img src={request.userId.image}/>
        <p className='name'>
          <Link to={`/users/${request.userId._id}`}><span className='bold'>{request.userId.name}</span></Link>
          <br/>
          <span className='small'>{new Date(request.date).toDateString()}</span>
        </p>
      </div>
      
      <div className='status'>
        <p className={request.status}>...{request.status}</p>
        {
          request.status === 'pending' ? 
          ''
          :
          <Form method='post'>
            <input type='hidden' name='requestId' value={request._id} />
            <button
              className='delete'
              type='submit'
              name='actionType'
              value='delete'
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </Form>
        }
      </div>
    </div>
  )
}

function RecivedRequest({request}){
  return(
    <div className='recieved'>
      <div className='name'>
        <img src={request.userId.image}/>
        <p className='name'>
          <Link to={`/users/${request.userId._id}`}><span className='bold'>{request.userId.name}</span></Link>
          <br/>
          <span className='small'>{new Date(request.date).toDateString()}</span>
        </p>
      </div>
      <div className='btn-group'>
        <Form method='post'>
          <input type='hidden' name='requestId' value={request._id} />
          <button
            className='accept'
            type='submit'
            name='actionType'
            value='accepted'
          >
            accept
          </button>

          <button
            className='decline'
            type='submit'
            name='actionType'
            value='declined'
          >
            decline
          </button>
        </Form>
      </div>
    </div>
  )
}

// Fallback UI for sent requests
export function SkeletonSentRequests(){
  return(
    <>
      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
      </div>
    </>
  )
}

// Fallback UI for recived requests
export function SkeletonReceivedRequests(){
  return(
    <>
      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
        <div className='skeleton-btn'></div>
      </div>

      <div className='skeleton-user'>
        <div className='skeleton-account'></div>
        <div className='skeleton-name'></div>
        <div className='skeleton-btn'></div>
        <div className='skeleton-btn'></div>
      </div>
    </>
  )
}