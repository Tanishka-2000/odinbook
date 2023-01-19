import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import Post from '../post/post.jsx';
import './styles.css';
import PostForm from '../postForm/postForm';

export default function Home(){
  return(
    <div className='home'>
      {/* <div className='write'>
        <span className="material-symbols-outlined">add</span>
        <div>
          <p className='bold'>Create Story</p>
          <p>Share a photo or write something.</p>
        </div>
      </div>
      <Post img={image1}/>
      <Post img={image2}/>
      <Post img={image3}/>     */}
      <PostForm />
    </div>
  )
}