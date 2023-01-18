import './post.css';
import image1 from '../../images/image1.jpg';
export default function Post({img}){
  return(
    <div className='post'>
      <div className='info'>
        <div className='head'>
          <span className='material-symbols-outlined'>person</span>
          <div>
            <p className='bold'>Snow White</p>
            <p className='light small'>6 january 2023</p>
          </div>
        </div>  
        <p className='regular'>These 2 women had drastic makeovers to restore their appearance.</p>
      </div>  
     
      <img src={img}/>

      <div className='data'>
        <p>24K likes</p>
        <p>1.3K comments</p>
      </div>

      <div className='btn-group'>
        <button><span className='material-symbols-outlined'>thumb_up</span>like</button>
        <button><span className='material-symbols-outlined'>comment</span>comment</button>
      </div>
    </div>
  )
}