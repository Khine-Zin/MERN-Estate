import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {Start,Failure,Success} from "../redux/user/userSlice"
import OAuth from "../components/OAuth"

const SignIn = () => {
  const [formData,setFormData]=useState({});
 const {user}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleChange=(e)=>{
    setFormData(
      {
        ...formData,[e.target.id]: e.target.value,
      }
    )
  };
  

  const handleClick=async(e)=>{
    e.preventDefault();
    dispatch(Start());
    try{
      const res=await axios.post("http://localhost:3000/auth/signin",formData)
    const data=res.data;
   
    console.log(typeof(data))
    if(data.success===true){
      dispatch(Success(data));
      navigate("/")
     }else{
      dispatch(Failure(data.message));
     }
    
   
    }catch(error){
      dispatch(Failure(error.message));
    }
   
  }
 
 
  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign In</h1>
      <form onSubmit={handleClick} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' required className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type="passward" placeholder='passward' required className='border p-3 rounded-lg' id="passward" onChange={handleChange}/>
        <button  className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {user.loading? "loading..." : "sign in"}
         
          </button>
          <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Don't have an account?</p>
        <Link to={"/sign-up"}><span className="text-blue-700 font-semibold">Sign up</span></Link>
      </div>
      {user.error && <p className="text-red-500 mt-3 ">{user.error}</p>}
    </div>
  )
}

export default SignIn