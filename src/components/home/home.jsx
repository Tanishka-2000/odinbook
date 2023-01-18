import image1 from '../../images/image1.jpg';
import image2 from '../../images/image2.jpg';
import image3 from '../../images/image3.jpg';
import Post from '../post/post.jsx';
import './home.css';

export default function Home(){
  return(
    <div className='home'>
      <Post img={image1}/>
      <Post img={image2}/>
      <Post img={image3}/>    
    </div>
  )
}