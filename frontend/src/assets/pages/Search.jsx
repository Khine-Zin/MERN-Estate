import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import ListingItem from '../components/ListingItem';

const Search = () => {
const [sidebarData,setSidebarData]=useState({
    searchTerm:"",
    type:"all",
    parking:false,
    furnished:false,
    offer:false,
    sort:"created_at",
    order:"desc"
});
const navigate=useNavigate();
const [loading,setLoading]=useState(false);
const [listing,setListing]=useState([])
const [showMore,setShowMore]=useState(false)


const handleChange=(e)=>{
  
    if(e.target.id==="all" || e.target.id ==="rent" || e.target.id ==="sale"){
        setSidebarData({...sidebarData,type:e.target.id})
    }
    if(e.target.id ==="searchTerm"){
        setSidebarData({...sidebarData,searchTerm:e.target.value})
    }
   
    if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
        setSidebarData({
            ...sidebarData, [e.target.id] : e.target.checked
        })
       }
  
    if(e.target.id === "sort-order"){
        const sort=e.target.value.split("_")[1] || "created_at";
        const order=e.target.value.split("_")[1] || "desc";
        setSidebarData({...sidebarData ,sort ,order})
    }

}

const handleSubmit=(e)=>{
    e.preventDefault();
    const urlParams=new URLSearchParams();
    urlParams.set("searchTerm",sidebarData.searchTerm)
    urlParams.set("type",sidebarData.type)
    urlParams.set("parking",sidebarData.parking)
    urlParams.set("furnished",sidebarData.furnished)
    urlParams.set("offer",sidebarData.offer)
    urlParams.set("sort",sidebarData.sort)
    urlParams.set("order",sidebarData.order)
    const searchQuery=urlParams.toString()
    navigate(`/search?${searchQuery}`)
}

useEffect(()=>{
    const urlParams=new URLSearchParams(location.search);
    const searchTermFormUrl=urlParams.get("searchTerm");
    const typeFormUrl=urlParams.get("type");
    const parkingFormUrl=urlParams.get("parking");
    const furnishedFormUrl=urlParams.get("furnished");
    const offerFormUrl=urlParams.get("offer");
    const sortFormUrl=urlParams.get("sort");
    const orderFormUrl=urlParams.get("order");

    if(searchTermFormUrl || typeFormUrl || parkingFormUrl || furnishedFormUrl || offerFormUrl || sortFormUrl || orderFormUrl){
        setSidebarData({
            searchTerm : searchTermFormUrl || "",
            type : typeFormUrl || "all",
            parking : parkingFormUrl==="true" ? true : false,
            furnished : furnishedFormUrl==="true" ? true : false,
            offer : offerFormUrl==="true" ? true : false,
            sort : sortFormUrl || "created_at",
            order : orderFormUrl || "desc"
        })
    }
    const fetchListings=async()=>{
        setLoading(true);
        setShowMore(true)
        const searchQuery=urlParams.toString();
      
        const res=await axios.get(`http://localhost:3000/listing/getListing?${searchQuery}`);
        const data=res.data;
        if (data.result.length>8){
            setShowMore(true)
        }else{
            setListing(false)
        }
        setListing(data.result)
        setLoading(false);
    };
    fetchListings();
},[location.search])

const showMoreClick=async()=>{
    const numberOfList=listing.length;
    const startIndex=numberOfList;
    const urlParams=new URLSearchParams(location.search);
    urlParams.set("startIndex",startIndex);
    const searchQuery=urlParams.toString();
    const res=await axios.get(`http://localhost:3000/listing/getListing?${searchQuery}`);
    const data=res.data;
    if(data.result.length <9 ){
        setShowMore(false)
    }
    setListing([...listing,...data.result])
}

  return (
    <div className='flex flex-col md:flex-row'>
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                <div className='flex items-center gap-2'>
                    <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                    <input type='text' id='searchTerm' placeholder='Search...' className='border rounded-lg p-3 w-full' onChange={handleChange} value={sidebarData.searchTerm} />
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Type:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="all" className='w-5' checked={sidebarData.type === "all"} onChange={handleChange} />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="rent" className='w-5' checked={sidebarData.type === "rent"} onChange={handleChange} />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                    <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={sidebarData.type === "sale"}/>
                        <span>Sale</span>
                    </div> 
                    <div className='flex gap-2'>
                        <input type='checkbox' id="offer" className='w-5' checked={sidebarData.offer} onChange={handleChange}/>
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap items-center'>
                    <label className='font-semibold'>Amenities:</label>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="parking" className='w-5' checked={sidebarData.parking} onChange={handleChange}/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type='checkbox' id="furnished" className='w-5' checked={sidebarData.furnished} onChange={handleChange}/>
                        <span>Furnished</span>
                    </div>
                    
                </div>
                <div className='flex items-center gap-2'>
                    <label className='font-semibold'>Sort:</label>
                    <select id='sort-order' className='border rounded-lg p-3' defaultValue={"created_at_desc"} onChange={handleChange}>
                        <option value="regularPrice_desc">Price high to low</option>
                        <option value="regularPrice_asc">Price Low to high</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className='p-7 flex flex-col gap-4'>
            <h1 className='text-3xl font-bold border-b py-3 text-slate-700'>Listing Results:</h1>
            <div className='flex flex-wrap gap-6'>
                {!loading && listing.length ===0 && (
                    <p className='text-xl text-slate-700 font-semibold'>No listing found!</p>
                )
                }
                {
                    loading && (
                        <p className='text-xl text-slate-700 text-center w-full '>Loading...</p>
                    )
                }
                {!loading && listing && (
                    Array.from(listing).map((listing)=>{
                       return <ListingItem key={listing._id} listing={listing}/>
                    })
                )
                }
                {showMore && (
                    <button onClick={showMoreClick} className='text-green-700 hover:underline p-7 text-center w-full'>Show more</button>
                )}
            </div>
        </div>
    </div>
  )
}

export default Search
