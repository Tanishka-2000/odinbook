import './styles.css';
import pagenotfound from '../../images/404.png';
import { Link } from 'react-router-dom';

export default function ErrorPage(){
  return(
    <div className='errorPage'>
      <img src={pagenotfound} />
      <Link to='/'>Back to Home</Link>
    </div>
  )
}