import './styles.css';

export default function PostForm(){
  return(
    <div className='new-post'>
      {/* <div className='container'> */}
        <p className='heading'>Create Post</p>
        <span className="material-symbols-outlined close-btn" aria-label='close button'>close</span>
        <div className='user'>
          <span className='material-symbols-outlined'>person</span>
          <p className='bold'>Snow White</p>
        </div>
        <form>
          <textarea rows='4' aria-label='write your message here' placeholder="What's on your mind, Snow White ?"></textarea>
          <input type='text' aria-label='Image URL' placeholder='add image url'/>
          <input  type='text' aria-label='tags' placeholder='add tags'/>
          <button>Post</button>
        </form>
      {/* </div> */}
    </div>  
  )
}