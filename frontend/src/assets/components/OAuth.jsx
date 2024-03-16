import React from 'react'
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import {useDispatch} from "react-redux";
import {Failure,Success} from "../redux/user/userSlice";
import {useNavigate} from "react-router-dom"

const OAuth = () => {
const navigate=useNavigate();
const dispatch=useDispatch();
  const handleGoogleClick=useGoogleLogin({
    onSuccess:async( response)=>{
      
      try{
         const res=await axios.get("https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers:{
            "Authorization":`Bearer ${response.access_token}`
          }
        })
        console.log(typeof(res))
        const data=await axios.post("http://localhost:3000/auth/google",{
          username:res.data.name,
          email:res.data.email,
          picture:res.data.picture,

        });
      
        navigate("/")
          dispatch(Success(data.data))
      } catch(error){
          dispatch(Failure(error))
      }

    }
  })

  return (
   <button onClick={()=>handleGoogleClick()} type="button" className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with Google</button>
  )
}

export default OAuth