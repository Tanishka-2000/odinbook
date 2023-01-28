import { Outlet, redirect } from "react-router-dom";
import Navbar from "../navbar/navbar";


export async function loader(){
  const token = localStorage.getItem('token');
  console.log(token);
  if(!token) return redirect('/login');
  return null;
}

export default function Main(){
  return(
    <>
    <Navbar />
    <Outlet/>
    </>
  )
}