import { Outlet, redirect } from "react-router-dom";
import Navbar from "../navbar/navbar";
import './styles.css';


export async function loader(){
  const token = localStorage.getItem('token');
  if(!token) return redirect('/login');
  return null
}

export default function Main(){
  return(
    <div className='main'>
    <Navbar />
    <Outlet/>
    </div>
  )
}