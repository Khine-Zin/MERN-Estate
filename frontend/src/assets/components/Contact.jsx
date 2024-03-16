import axios from 'axios';
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Contact = ({listing}) => {
    const [contact,setContact]=useState(null);
    const [message,setMessage]=useState("");
    const [error,setError]=useState(null);
    const [loading,setLoading]=useState(false);

    useEffect(()=>{
        const fetchContact=async()=>{
            
           try{
            setLoading(true)
            const res=await axios.get(`http://localhost:3000/user/${listing.userRef}`);
            const data=res.data;
            
            if(data.success === false){
                setError(true)
                setLoading(false)
                return;
              }
              setLoading(false)
              setContact(data.result)
              setError(null)
           }catch(error){
            setError(true)
            setLoading(false)
           }
        };
        fetchContact()
    },[listing.userRef])

    const handleChange=(e)=>{
        setMessage(e.target.value)
    }
   
  return (
    <div className='flex flex-col  '>
        {
            contact && (
                <div className=''>
                    <p className='font-semibold mb-2'>Contact  <span>{contact.username}</span> for <span>{listing.name.toLowerCase()}</span>
                    </p>
                    <textarea name="message" id="message" rows="2" value={message} placeholder='Enter your message here' onChange={handleChange} className='w-full border p-3 rounded mb-4' />
                <div className='bg-slate-700  text-white text-center p-3 uppercase rounded-lg hover:opacity-95'>
                <Link to={`mailto:${contact.email}?subject=Regarding ${listing.name} &body=${message}`} >
                Send Message
                </Link>
                </div>
                </div>
            )
        }
        </div>
  )
}

export default Contact