import './styles.css';
// import userImage from '../../images/user.jpg';
// import cat1 from '../../images/cat1.jpg';
// import cat2 from '../../images/cat2.jpg';
// import cat3 from '../../images/cat3.jpg';


export default function Post({data}){
  return(
    <div className='post'>
      <div className='info'>
        <div className='head'>
          <div><img className='account-img' src={data.author.image}/></div>
          <div>
            <p className='bold'>{data.author.name}</p>
            <p className='light small'>n{new Date(data.postedAt).toDateString()}</p>
          </div>
        </div>  
        <p className='regular'>{data.message}</p>
      </div>  
     
      <img src={data.imageUrl}/>

      <div className='data'>
        <p>{data.likes} likes</p>
        <p>{data.comments.length} comments</p>
      </div>

      <div className='btn-group'>
        <button><span className='material-symbols-outlined'>thumb_up</span>like</button>
        <button><span className='material-symbols-outlined'>comment</span>comment</button>
      </div>

      {/* comments should be visible on clicking comment button */}
      {/* <Comments /> */}
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