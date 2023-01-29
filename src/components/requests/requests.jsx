import './styles.css';
import cat from '../../images/cat3.jpg';
import {redirect, useLoaderData} from 'react-router-dom';
import { useState } from 'react';

export async function requestsLoader(){
  const response = await fetch('http://localhost:3000/protected/requests',{
    method: 'get',
    headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  if(response.status >= 400) return redirect('/login');
  const data = await response.json();
  // console.log(data);
  let sent = [], recieved = [];
  data.forEach(request => {
    if(request.domain == 'sent') sent = [...sent, request];
    else recieved = [...recieved, request];
  });
  return {sent, recieved};
}

export default function Requests(){
  const [sentRequests, setSentRequests] = useState(true);
  const {sent, recieved} = useLoaderData();
  console.log({sent, recieved});
  
  return(
    <div className='requests'>
      <div className='switch-btns'>
        <button onClick={() => setSentRequests(true)}>Sent Requests</button>
        <button onClick={() => setSentRequests(false)}>Recived Request</button>
      </div>
      {sentRequests ? 
        sent.map(request => <SentRequest key={request._id} request={request}/>)
        :
        recieved.map(request => <RecivedRequest key={request._id} request={request} />)}
    </div>
  )
}

function SentRequest({request}){
  return(
    <div className='sent'>
      <div className='name'>
        <img src={request.userId.image}/>
        <p>
          <span className='bold'>{request.userId.name}</span>
          <br/>
          <span className='small'>{new Date(request.date).toDateString()}</span>
        </p>
      </div>
      
      <div className='status'>
        <p className=''>...{request.status}</p>
        <button className='delete'><span className="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  )
}

function RecivedRequest({request}){
  return(
    <div className='recieved'>
      <div className='name'>
        <img src={request.userId.image}/>
        <p>
          <span className='bold'>{request.userId.name}</span>
          <br/>
          <span className='small'>{new Date(request.date).toDateString()}</span>
        </p>
      </div>
      <div className='btn-group'>
        <button className='accept'>accept</button>
        <button className='decline'>decline</button>
      </div>
    </div>
  )
}