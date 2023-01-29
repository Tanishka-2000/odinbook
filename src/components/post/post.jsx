import { useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';
import './styles.css';
// import userImage from '../../images/user.jpg';
// import cat1 from '../../images/cat1.jpg';
// import cat2 from '../../images/cat2.jpg';
// import cat3 from '../../images/cat3.jpg';


export default function Post({post}){
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    if(showComments) {
      setShowComments(false);
      return;
    }
    console.log('loading');
    console.log(post._id);
    const response = await fetch(`http://localhost:3000/protected/posts/${post._id}/comments`,{
      method: 'get',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    if(response.status >= 400) return redirect('/login');
    const data = await response.json();
    setComments(data);
    setShowComments(true);
  }

  const likePost = async () => {
    const response = await fetch(`http://localhost:3000/protected/posts/${post._id}/like`,{
      method: 'put',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
  return(
    <div className='post'>
      <div className='info'>
        <div className='head'>
          <div><img className='account-img' src={post.author.image}/></div>
          <div>
            <p className='bold'>{post.author.name}</p>
            <p className='light small'>{new Date(post.postedAt).toDateString()}</p>
          </div>
        </div>  
        <p className='regular'>
          {post.message}
          <span className='tags'>{post.tags.map(tag => `#${tag}`)}</span>    
        </p>
      </div>  
     
      <img src={post.imageUrl}/>

      <div className='data'>
        <p>{post.likes} likes</p>
        {/* <p>{data.comments.length} comments</p> */}
      </div>

      <div className='btn-group'>
        <button onClick={likePost}><span className={`material-symbols-outlined ${post.isLiked ? 'liked' : ''}`}>thumb_up</span>like</button>
        <button onClick={loadComments}>
          <span className='material-symbols-outlined'>comment</span>
          comment
        </button>
      </div>

      {/* comments should be visible on clicking comment button */}
      {showComments ? <Comments comments={comments}/> : ''}
  </div>
  )
}

function Comments({comments}){

  return(
    <div className='comments'>
      <div className='write-comment'>
        <div><img className='account-img' src={localStorage.getItem('avatar')}/></div>
        <form>
          <textarea aria-label=' write comment' placeholder='write a comment...' rows={3}></textarea>
          <button aria-label='share comment'><span className='material-symbols-outlined'>send</span></button>
        </form>
      </div>

      {comments.map(comment => <Comment comment={comment} />)}
    </div>  
  )
}

function Comment ({comment}){
  return(
    <div className='comment'>
      <div><img className='account-img' src={comment.author.image}/></div>
      <div className='msg'>       
        <p className='bold title'>
          {comment.author.name} <br/>
          <span className='light small'>{new Date(comment.postedAt).toDateString()}</span>
        </p>       
        <p>{comment.message}</p>
      </div>  
    </div>
  )
}