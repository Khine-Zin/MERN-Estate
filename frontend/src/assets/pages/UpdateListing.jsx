import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {useNavigate,useParams} from "react-router-dom"


const UpdateListing = () => {
    const [images,setImages]=useState({});
     const [file,setFile]=useState("");
    const [formData,setFormData]=useState({
        files:"",
        name:"",
        description:"",
        address:"",
        type:"rent",
        bedrooms:1,
        bathrooms:1,
        regularPrice:0,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
        
    });

    
    const [ImageError,setImageError]=useState(null);
    const [error,setError]=useState(null);
  const [loading,setLoading]=useState(false);
  const [uploadLoading,setUploadLoading]=useState(false);
  const {user}=useSelector(state=>state.user);
  const navigate=useNavigate();
  const params=useParams();
  
  const handleImage=(e)=>{
        setFile(e.target.files);
      }

  

    const handleImageUpload=()=>{
        setUploadLoading(true)
        if(file.length > 0 && file.length <7){
          setImages(file)
            setImageError(null)
            setUploadLoading(false)
        }else{
            setImageError("You can upload 6 images per listing")
            setUploadLoading(false)
        }
    }

    useEffect(()=>{
      
        setFormData({...formData,"files":images})
    },[images])
    

    const handeRemoveImage=(index)=>{
        setImages(
            Array.from(images).filter((_,i)=>{
                return  index !== i
               })
        )
    }

    const handleChange=(e)=>{
        if(e.target.id === "sale" || e.target.id === "rent"){
            setFormData({
                ...Data, type:e.target.id
            })
        };

        if(e.target.id === "parking" || e.target.id === "furnished" || e.target.id === "offer"){
            setFormData({
                ...formData, [e.target.id] : e.target.checked
            })
        };

        if(e.target.type === "number" || e.target.type === "text" || e.target.type ==="textarea"){
            setFormData({
                ...formData, [e.target.id] : e.target.value
            })
        }
    };

    const handleSubmit=async(e)=>{
        e.preventDefault();
        if (formData.files.length<1) return setError("You must upload at least one image");
        if(formData.discountPrice > formData.regularPrice) return setError("Discount Price must be lower than  regular price")
        setLoading(true);
        const data=new FormData();
        Object.entries(formData).forEach(([key,value])=>{
            if(key==="files"){
            Array.from(value).forEach((file,index)=>{
                data.append("files",file)
            })
            }else{
                data.append(key,value)
            }
          
        },
        data.append("userRef",user.currentUser.result._id)
        )
        
      try{
        const response=await axios.post(`http://localhost:3000/listing/update/${params.id}`,data,{
            headers :{
              "Content-Type" :"multipart/form-data"
             
            }
          });
          const res=response.data;
         
          if(res.success===true){
            setLoading(false);
            setError(null)
           navigate(`/listing/${res.result._id}`)
           }else{
            setLoading(false)
            setError(res.message)
           }
          
       
         
          }catch(error){
            setLoading(false);
            setError(error.message)
          }
    }

  return (
    <main className='p-3 max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold text-center my-7'>Update a Listing</h1>
        <form onSubmit={handleSubmit}  className='flex flex-col sm:flex-row gap-4'>
           <div className='flex flex-col gap-4 flex-1'>
           <input type='text' placeholder='name'  className='border p-3 rounded-lg' id="name" maxLength="62" minLength="10" required onChange={handleChange} value={formData.name} />
            <textarea type='textarea' placeholder='description' className='border p-3 rounded-lg' id="description"  required onChange={handleChange} value={formData.description}/>
            <input type='text' placeholder='address' className='border p-3 rounded-lg' id="address" required  onChange={handleChange} value={formData.address}/>
            <div className='flex gap-6 flex-wrap'>
            <div className='flex gap-2'>
                <input type='checkbox' id='sale' className='w-5' onChange={handleChange} checked={formData.type === "sale"}/>
                <span>Sell</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='rent' className='w-5' onChange={handleChange} checked={formData.type === "rent"}/>
                <span>Rent</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='parking' className='w-5' onChange={handleChange} checked={formData.parking}/>
                <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished}/>
                <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
                <input type='checkbox' id='offer' className='w-5' onChange={handleChange} checked={formData.offer}/>
                <span>Offer</span>
            </div>
           </div>
           <div className='flex flex-wrap gap-6'>
            <div className='flex items-center gap-2'>
                <input type='number' id="bedrooms" min="1" max="10" required  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bedrooms}/>
                <p>Beds</p>
            </div>
            <div className='flex items-center gap-2'>
                <input type='number' id="bathrooms" min="1" max="10" required  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.bathrooms}/>
                <p>Baths</p>
            </div>
            <div className='flex items-center gap-2'>
                <input type='number' id="regularPrice" min="1" max="1000000" required  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.regularPrice}/>
               <div className='flex flex-col items-center'>
               <p>Regular Price</p>
               <span className='rext-xs'>($/month)</span>
               </div>
            </div>
           {formData.offer &&  
           <div className='flex items-center gap-2'>
                <input type='number' id="discountPrice" min="1" max="1000000" required  className='p-3 border border-gray-300 rounded-lg' onChange={handleChange} value={formData.discountPrice}/>
           <div className='flex flex-col items-center'>
           <p>Discount Price</p>
            <span className='rext-xs'>($/month)</span>
           </div>
            </div>
            }
           </div>
           </div>

           <div  className='flex flex-col flex-1 gap-4'>
                <p className='font-semibold '>Images:
                <span className='text-gray-600 ml-2'>The first image will be the cover(max-6)</span>
                </p>
               
                <div className='flex gap-4'>
                    <input onChange={handleImage} className='p-3 border border-gray-300 rounded w-full' type='file' id="images" accept='image/*' multiple/>
                    <button type="button" onClick={handleImageUpload} className='text-green-700 px-2 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploadLoading? "Uploading": "Upload"}</button>
                     </div>
                     {
                    Array.from(images).map((url,index)=>{
                      return <div key={index} className="flex justify-between p-3 border items-center">
                        <img  src={URL.createObjectURL(url)} className="w-20 h-14 object-cover rounded-lg"/>
                        <button type="button" onClick={()=>{handeRemoveImage(index)}} className="p-3 text-red-700 hover:opacity-75 uppercase font-semibold">Delete</button>
                      </div>
                    })
                }
                {ImageError && <p className="text-red-500 mt-3 ">{ImageError}</p>}
                <button disabled={loading || uploadLoading}  className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? "Update Listing...." : "Update Listing"}</button>
                {error && <p className="text-red-500 mt-3 ">{error}</p>}
           </div>
         
        </form>
    </main>
  )
}

export default UpdateListing