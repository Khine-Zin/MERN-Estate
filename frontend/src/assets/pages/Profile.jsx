import {useEffect, useRef, useState} from 'react'
import { useSelector ,useDispatch} from 'react-redux'
import {useNavigate} from "react-router-dom"
import axios from "axios";
import { Link } from 'react-router-dom'; 
import {Start,Failure,Success,signOut,deleteAcc} from "../redux/user/userSlice"
import Swal from "sweetalert2"


const Profile = () => {
  const fileRef=useRef(null);
  const [image,setImage]=useState();
  const [formData,setFormData]=useState({});
  const [listingError,setListingError]=useState(false);
  const [userListing,setUserListing]=useState()
  const {user}=useSelector(state=>state.user);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const handleImage=(e)=>{
    setImage(e.target.files[0]);
    
  }
  useEffect(()=>{
    setFormData({...formData,file:image})
  },[image])


 
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleClick=async(e)=>{
    e.preventDefault();
    dispatch(Start());

  
    
    try{
      const res=await axios.post(`http://localhost:3000/user/update/${user.currentUser.result._id}`,formData,{
      headers :{
        "Content-Type" :"multipart/form-data"
      }
    });
   
    const data=res.data;
    
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

  const handleSignOut=async()=>{
    try{
      const res=await axios.get("http://localhost:3000/auth/signout");
      const data=res.data;
      if(data.success===false){
        return dispatch(Failure(data.message));
       }
     dispatch(signOut())
    }catch(error){
      dispatch(Failure(error))
    }
    
  }

  const handleDelete=async()=>{
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result)=>{
      if(result.isConfirmed){
        try{
          const res=await axios.delete(`http://localhost:3000/user/delete/${user.currentUser.result._id}`);
          const data=res.data;
          if(data.success===false){
            return dispatch(Failure(data.message));
           }
          dispatch(deleteAcc())
        }catch(error){
          dispatch(Failure(error))
        }
      }
    })
    
  }

  const handleShowListing=async()=>{
    
    try{
      setListingError(true)
      const res=await axios.get(`http://localhost:3000/user/listing/${user.currentUser.result._id}`)
      const data=res.data;
   
      if(data.success === false){
        setListingError(true);
        return;
      }
      setUserListing(data.result)
     
    }catch(error){
      setListingError(true)
    }
  }
 
  const handleListingDelete=async(id)=>{
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#15803D",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async(result)=>{
    if(result.isConfirmed){
      try{
        const res=await axios.delete(`http://localhost:3000/listing/delete/${id}`);
        const data=res.data;
        if(data.success === false){
          return;
        }
  
        setUserListing((pre)=>pre.filter((listing)=>listing._id !== id));
  
      }catch(error){
        console.log(error)
      }
    }
    })
   
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>Profile</h1>
      <form onSubmit={handleClick} encType='multipart/form-data' className='flex flex-col gap-4'>
        <div onClick={()=>fileRef.current.click()} className='flex justify-center'>
        <input type='file' onChange={handleImage} ref={fileRef} hidden accept='image/*'/>
       {image ?  <img src={URL.createObjectURL(image)} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>: <img src={user.currentUser.result?.picture} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'/>}
        </div>
        <input type='text' placeholder='username' defaultValue={user.currentUser.result?.username} onChange={handleChange} id='username' className='border p-3 rounded-lg'/>
        <input type='email' placeholder='email' defaultValue={user.currentUser.result?.email} id='email' onChange={handleChange} className='border p-3 rounded-lg'/>
        <input type='passward' placeholder='passward' id='passward' onChange={handleChange} className='border p-3 rounded-lg'/>
        <button disabled={user.loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>{user.loading? "loading..." : "Update"}</button>
      <Link className='bg-green-700 text-white rounded-lg p-3 text-center uppercase hover:opacity-95 disabled:opacity-80' to={"/create-listing"}>
        Create Listing
      </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDelete}  className='text-red-700 font-medium cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 font-medium cursor-pointer'>Sign Out</span>
      </div>
      {user.error && <p className="text-red-500 mt-3 ">{user.error}</p>}
     <button onClick={handleShowListing} className='text-green-700 w-full my-10'>Show Listings</button>
     {/* {listingError && <p className="text-red-500 mt-3 ">{listingError}</p>} */}
     {
      userListing && userListing.length > 0 &&
      
      (
      
    Array.from(userListing).map((listing)=>{
          return  <div key={listing._id} className='border rounded-lg p-3 flex justify-between items-center gap-4'>
        
          <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} className='h-12 w-16 object-cover ' />
          </Link>
          <Link to={`/listing/${listing._id}`}>
            <p className='text-slate-700 font-semibold flex-1 hover:underline truncate'>{listing.name}</p>
          </Link>

          <div className='flex flex-col items-center'>
            <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase text-sm font-semibold'>Delete</button>
           <Link to={`/update-listing/${listing._id}`}>
           <button className='text-green-700 uppercase text-sm font-semibold'>Edit</button>
           </Link>
          </div>
      
        </div>
          
        })
      ) 
     }
    </div>
    
  )
}

export default Profile