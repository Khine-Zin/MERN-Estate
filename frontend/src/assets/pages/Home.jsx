import axios from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {Swiper,SwiperSlide} from "swiper/react"
import  SwiperCore from "swiper";
import { Navigation} from 'swiper/modules';
import "swiper/css/bundle"
import ListingItem from "../components/ListingItem";

const Home = () => {
  const [offerListing,setOfferListing]=useState([]);
  const [saleListing,setSaleListing]=useState([]);
  const [rentListing,setRentListing]=useState([]);
  SwiperCore.use([Navigation])
  

  useEffect(()=>{
    const fetchOfferListing=async()=>{
        try{
          const res=await axios.get("http://localhost:3000/listing/getListing?offer=true&limit=4");
          const data=res.data;
          
          setOfferListing(data.result)
         
        }catch(error){
          console.log(error)
        }
    };
    fetchOfferListing();
    console.log(offerListing)
    const fetchRentListing=async()=>{
      try{
        const res=await axios.get(`http://localhost:3000/listing/getListing?type=rent&limit=4`);
        const data=res.data;
        setRentListing(data.result)
      
      }catch(error){
        console.log(error)
      }
  };
  fetchRentListing();
  const fetchSaleListing=async()=>{
    try{
      const res=await axios.get(`http://localhost:3000/listing/getListing?type=sale&limit=4`);
      const data=res.data;
      setSaleListing(data.result)
     
    }catch(error){
      console.log(error)
    }
};
fetchSaleListing();
 
  },[])
  
  return (
   <div>
    {/* top */}
    <div className="flex flex-col gap-6 p-16 px-3 max-w-6xl mx-auto">
      <h1 className="text-slate-700 font-bold text-3xl lg:text-6xl">
          Find your next <span className="text-slate-500">perfect</span><br/>
          place with ease
      </h1>
      <div className="text-gray-400 text-xs sm:text-sm">
            X-mark Estate is the best place to find your next perfect place to live<br/>
            We have a wide range of properties for you to choose from.
      </div>
      <Link to={"/search"} >
        <button className="text-xs sm:text-sm text-blue-800 font-bold hover:underline">Let get start...</button>
      </Link>
    </div>

    {/* swipper */}
     <Swiper navigation>
     {
        offerListing && offerListing.length >0 && offerListing.map((listing)=>{
          return <SwiperSlide key={listing._id}>
          <div className='h-[370px]' style={{background:`url(${listing.imageUrls[0]}) center no-repeat`,backgroundSize:"cover"}}></div>
      </SwiperSlide>
        })
      }
     </Swiper>
     {/* listing */}

     <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListing && offerListing.length >0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent offers</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={"/search?offer=true"}>Show more offers</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListing.map((listing)=>{
                   return <ListingItem listing={listing} key={listing._id}/>
                  })
                }
              </div>
            </div>
          )
        }
         {
          saleListing && saleListing.length >0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for sale</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>Show more sales</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListing.map((listing)=>{
                   return <ListingItem listing={listing} key={listing._id}/>
                  })
                }
              </div>
            </div>
          )
        }
        {
          rentListing && rentListing.length >0 && (
            <div className="">
              <div className="my-3">
                <h2 className="text-2xl font-semibold text-slate-600">Recent places for rent</h2>
                <Link className="text-sm text-blue-800 hover:underline" to={"/search?type=rent"}>Show more rents</Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListing.map((listing)=>{
                   return <ListingItem listing={listing} key={listing._id}/>
                  })
                }
              </div>
            </div>
          )
        }
     </div>

   </div>
  )
}

export default Home