import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn } from "react-icons/md"
import {FaBath, FaBed} from "react-icons/fa"

function ListingItem({listing}) {
  
  return (
    <div className=' bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-[350px] lg:w-[270px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrls[0]} className='h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
        <div className='p-3 flex flex-col gap-2 w-full '>
            <p className='font-semibold text-lg text-slate-700 truncate'>{listing.name}</p>
            <div className='flex items-center gap-1 text-green-700'>
            <MdLocationOn className='h-4 w-4'/>
            <p className='text-sm text-gray-600 truncate  w-full'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'> {listing.description}</p>
            <p className='text-slate-500 mt-2 font-semibold'>
                ${listing.offer ? listing.discountPrice.toLocaleString("en-US") : listing.regularPrice.toLocaleString("en-US")}
                {listing.type ==="rent" && "/month"}
            </p>
            <div className='text-slate-700 flex gap-2'>
                <div className='font-bold text-xs flex items-center'>
                <FaBath className='text-lg'/>
              {listing.bathrooms>1 ? `${listing.bathrooms} baths` :`${listing.bathrooms} bath`} 
                </div>
                <div className='font-bold text-xs flex items-center'>
                <FaBed className='text-lg'/>
              {listing.bedrooms>1 ? `${listing.bedrooms} beds` :`${listing.bedrooms} bed`}
                </div>
            </div>
        </div>
       </Link>
    </div>
  )
}

export default ListingItem