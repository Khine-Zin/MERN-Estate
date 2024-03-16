import { useState } from "react"
import {Link,useNavigate} from "react-router-dom"
import axios from "axios";
import OAuth from "../components/OAuth"


const SignUp = () => {
  const [formData,setFormData]=useState({});
  const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false)
  
  const navigate=useNavigate();
  const handleChange=(e)=>{
    setFormData(
      {
        ...formData,[e.target.id]: e.target.value,
      }
    )
  };
  

  const handleClick=async(e)=>{
    e.preventDefault();
    setLoading(true)
   try{
    const res=await axios.post("http://localhost:3000/auth/signup",formData)
    const data=res.data;
    if(data.success===true){
     setLoading(false)
      navigate("/sign-in")
     }else{
      setError(data.message);
      setLoading(false);
      return;
     }
   }catch(error){
    setError(error.message);
    setLoading(false);
   }

  }
 

  return (
    <div className='p-3 mx-auto max-w-lg'>
      <h1 className='text-3xl text-center font-bold my-7'>Sign Up</h1>
      <form onSubmit={handleClick} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' required className='border p-3 rounded-lg' id="username" onChange={handleChange}/>
        <input type="email" placeholder='email' required className='border p-3 rounded-lg' id="email" onChange={handleChange}/>
        <input type="passward" placeholder='passward' required className='border p-3 rounded-lg' id="passward" onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading? "loading..." : "sign up"}
          </button>
          <OAuth/>
      </form>
      <div className='flex gap-2 mt-5 '>
        <p>Have an account?</p>
        <Link to={"/sign-in"}><span className="text-blue-700 font-semibold">Sign in</span></Link>
      </div>
      {error && <p className="text-red-500 mt-3 ">{error}</p>}
    </div>
  )
}

export default SignUp