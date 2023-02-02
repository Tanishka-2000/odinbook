import { useState } from 'react';
import { Form, Link, redirect, useFetcher } from 'react-router-dom';
import './styles.css';

export default function Post({post, saved}){
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  // const fetcher = useFetcher();

  const loadComments = async () => {

    // if(showComments) return setShowComments(false);
    const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/posts/${post._id}/comments`,{
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
    const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/posts/${post._id}/like`,{
      method: 'put',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }

  const savePost = async (e) => {
    const response = fetch('https://odinbook-api-1dl4.onrender.com/protected/saved-posts',{
      method: 'put',
      headers: {
          'Content-Type': 'application/JSON',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({postId: post._id})
    });
    e.target.classList.add('pressed');
    setTimeout(() => {
      e.target.classList.remove('pressed');
    },300)
  }

  return(
    <div className='post'>
      <div className='info'>
        <div className='head'>
          <div>
            <img className='account-img' src={post.author.image}/>
          </div>
          <div>
            <p className='bold name'><Link to={`/users/${post.author._id}`}>{post.author.name}</Link></p>
            <p className='light small'>{new Date(post.postedAt).toDateString()}</p>
          </div>
        </div>  
        <p className='regular'>
          {post.message}
          <span className='tags'>{post.tags.map(tag => `#${tag}`)}</span>    
        </p>
      </div>  
     
      <div className='image-container'>
        <img src={post.imageUrl}/>
        {saved ? '' : 
        <button className='save-post' aria-label='save post' onClick={e => savePost(e)}>
          {/* <span className="material-symbols-outlined">bookmark</span> */}
          +
        </button>
        }
      </div>

      <div className='data'>
        <p>{post.likes} likes</p>
        {/* <p>{data.comments.length} comments</p> */}
      </div>

      <div className='btn-group'>
        <button
          className={post.isLiked ? 'liked' : ''}
          onClick={e => {e.target.classList.toggle('liked'); likePost()}}
          >
          <span className={'material-symbols-outlined'}>thumb_up</span>
          like
        </button>

        <button onClick={() => showComments ? setShowComments(false) : loadComments()}>
          <span className='material-symbols-outlined'>comment</span>
          comment
        </button>
      </div>

      {/* comments should be visible on clicking comment button */}
      {showComments ? <Comments comments={comments} loadComments={loadComments} postId={post._id}/> : ''}
  </div>
  )
}

function Comments({comments, loadComments, postId}){

  const [message, setMessage] = useState('');

  const shareComment = async (e) => {
    e.preventDefault();
    // console.log(message);
    const response = await fetch(`https://odinbook-api-1dl4.onrender.com/protected/posts/${postId}/comments`,{
      method: 'post',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({message})
    });
    loadComments()
  }
  
  return(
    <div className='comments'>

      <div className='write-comment'>
        <div><img className='account-img' src={localStorage.getItem('avatar')}/></div>
        <form onSubmit={shareComment}>
          <textarea name='message' onChange={e => setMessage(e.target.value)} aria-label=' write comment' placeholder='write a comment...' rows={3}></textarea>
          <button aria-label='share comment' type='submit'><span className='material-symbols-outlined'>send</span></button>
        </form>
      </div>

      {comments.length > 0 ?
      comments.map(comment => <Comment key={comment._id} comment={comment} />)
      :
      'No comments on this post...'}
    </div>  
  )
}

function Comment ({comment}){
  return(
    <div className='comment'>
      <div><img className='account-img' src={comment.author.image}/></div>
      <div className='msg'>       
        <p className='bold title name'>
          <Link to={`/users/${comment.author._id}`}>{comment.author.name} </Link><br/>
          <span className='light small'>{new Date(comment.postedAt).toDateString()}</span>
        </p>       
        <p>{comment.message}</p>
      </div>  
    </div>
  )
}