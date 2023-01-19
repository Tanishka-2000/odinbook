import './styles.css';
import cat3 from '../../images/cat3.jpg'

export default function Friend(){
  return(
    <div className='friend'>
    {/* later replace with image of friend */}
      <img className='account-img' src={cat3}/>  
      <p>Ginger Brown</p>
      <button title='remove from friends list'>unfriend</button>
    </div>
  )
}