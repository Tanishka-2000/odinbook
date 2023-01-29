import './styles.css';
import cat from '../../images/cat3.jpg';

export default function Requests(){
  
  return(
    <div className='requests'>
      <RecivedRequest />
      <SentRequest />
    </div>
  )
}

function SentRequest(){
  return(
    <div className='sent'>
      <div className='name'>
        <img src={cat}/>
        <p>name</p>
      </div>
      
      <div className='status'>
        <p className=''>...pending</p>
        <button className='delete'><span className="material-symbols-outlined">delete</span></button>
      </div>
    </div>
  )
}

function RecivedRequest(){
  return(
    <div className='recieved'>
      <div className='name'>
        <img src={cat}/>
        <p>name</p>
      </div>
      <div className='btn-group'>
        <button className='accept'>accept</button>
        <button className='decline'>decline</button>
      </div>
    </div>
  )
}