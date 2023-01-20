import './styles.css';
import userImage from '../../images/user.jpg';
import cat1 from '../../images/cat1.jpg';
import cat2 from '../../images/cat2.jpg';
import cat3 from '../../images/cat3.jpg';


export default function Post({img}){
  return(
    <div className='post'>
      <div className='info'>
        <div className='head'>
          <div><img className='account-img' src={userImage}/></div>
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

      {/* comments should be visible on clicking comment button */}
      <Comments />
  </div>
  )
}

function Comments(){
  return(
    <div className='comments'>
      <div className='write-comment'>
        <div><img className='account-img' src={userImage}/></div>
        <form>
          <textarea aria-label=' write comment' placeholder='write a comment...' rows={3}></textarea>
          <button aria-label='share comment'><span className='material-symbols-outlined'>send</span></button>
        </form>
      </div>

      <div className='comment'>
        <div><img className='account-img' src={cat1}/></div>
        <div className='msg'>       
          <p className='bold title'>Snow White <span className='light small'>6 january 2023</span></p>       
          <p>I am so inspired by your fashion sense.</p>
        </div>  
      </div>

      <div className='comment'>
        <div><img className='account-img' src={cat2}/></div>   
        <div className='msg'>       
          <p className='bold title'>Snow White <span className='light small'>6 january 2023</span></p>       
          <p>I am so inspired by your fashion sense. could you also post the price.</p>
        </div>  
      </div>

      <div className='comment'>
        <div><img className='account-img' src={cat3}/></div>   
        <div className='msg'>       
          <p className='bold title'>Snow White <span className='light small'>6 january 2023</span></p>       
          <p>Really like your shoes. </p>
        </div>  
      </div>
    </div>  
  )
}