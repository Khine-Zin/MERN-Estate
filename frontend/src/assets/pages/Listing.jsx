import  { useEffect, useState } from 'react'
import axios from "axios";
import {useParams} from "react-router-dom"
import {Swiper,SwiperSlide} from "swiper/react"
import  SwiperCore from "swiper";
import { Navigation} from 'swiper/modules';
import "swiper/css/bundle"
import { useSelector } from "react-redux";
import {FaBath, FaBed, FaChair, FaMapMarkerAlt,FaParking,FaShare} from "react-icons/fa"
import Contact from '../components/Contact';

const Listing = () => {
    SwiperCore.use([Navigation])
    const [listing,setListing]=useState(null)
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);
    const [contact,setContact]=useState(false);
    const params=useParams();
    const {user}=useSelector(state=>state.user);
    

     useEffect(()=>{
        const fetchListing=async()=>{
            const id=params.id;
           try{
            setLoading(true)
            const res=await axios.get(`http://localhost:3000/listing/getListing/${id}`);
            const ListingData=res.data;
           
            if(ListingData.success === false){
                setError(true)
                setLoading(false)
                return;
              }
              setLoading(false)
              setListing(ListingData.result)
              setError(null)
           }catch(error){
            setError(true)
            setLoading(false)
           }
        };
        fetchListing()
    },[params.id])
    const handleContact=()=>{
      setContact(true)
    }
  return (
    <main>
        {loading && <p className='text-center my-10 text-2xl font-semibold'> Loading.....</p>}
        {error && <p className='text-center my-10 text-2xl font-semibold'> Something went wrong!</p>}
        {listing && !loading && !error && <div>
          
          <Swiper navigation>
            {Array.from(listing.imageUrls).map((url)=>{
               return <SwiperSlide key={url}>
                    <div className='h-[370px]' style={{background:`url(${url}) center no-repeat`,backgroundSize:"cover"}}></div>
                </SwiperSlide>
            })
            }
           </Swiper>
        
        
           {/* <div className='fixed top=[13%] right-[3%] z-10 rounded-full w-12 h-12 flex justify-center items-center bg-slate-100'>
            <FaShare className='text-slate-500'/>
           </div> */}
       <div className='flex flex-col p-4 lg:p-8 max-w-[80%] mx-auto '>
        <div className='text-2xl font-bold '>
          {listing.name} - ${""}
          {
            listing.offer ?
            listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")
          }
          {
            listing.type==="rent" && "/month"
          }

        </div>
       <p className='flex items-center mt-6 gap-2 text-slate-600 my-2 text-sm mb-4'>
            <FaMapMarkerAlt className='text-green-700'/>
            {listing.address}
          </p>
        <div className='flex gap-4 mb-4'>
        <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
          {listing.type === "rent" ? "For Rent": "For Sale"}
        </p>
        {
          listing.offer && <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>${+listing.regularPrice - +listing .discountPrice} Discount</p>
        }
        </div>
       
        
        <p className='text-slate-800 mb-4'>
          <span className='font-semibold text-black '>Description-</span>
          {listing.description}</p>
          <ul className=' text-green-900 font-semibold text-sm flex items-center gap-4 sm:gap-6 mb-6'>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBed className='text-lg'/>
              {listing.bedrooms>1 ? `${listing.bedrooms} beds` :`${listing.bedrooms} bed`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaBath className='text-lg'/>
              {listing.bathrooms>1 ? `${listing.bathrooms} baths` :`${listing.bathrooms} bath`}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaParking className='text-lg'/>
              {listing.parking ? "Parking spot" : "No Parking"}
            </li>
            <li className='flex items-center gap-1 whitespace-nowrap'>
              <FaChair className='text-lg'/>
              {listing.furnished ? "Furnished" : "Unfurnished"}
            </li>
          </ul>
          {
            user.currentUser.result && user.currentUser.result._id !== listing.userRef && !contact &&
            <button onClick={handleContact} className='bg-slate-700 oncl text-white  rounded-lg uppercase hover:opacity-95 p-3'>Contact landlord</button>
          }
          {
            contact && <Contact listing={listing}/>
          }
       </div>
        </div>
        }
     
    </main>

  )
}

export default Listing