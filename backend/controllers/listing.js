const Listing = require("../models/listing");
const Helper = require("../utils/helper");


const createListing=async(req,res,next)=>{
    const newListing = new Listing(req.body);
    try{
       
        await newListing.save();
        Helper.fMsg(res, true, "Listing Created Successfully", newListing);
    
    }catch(error){
        next(error)
      
    }
}

const deleteListing=async(req,res,next)=>{
    
    try{
        await Listing.findByIdAndDelete(req.params.id);
        Helper.fMsg(res, true, "Listing deleted");


    }catch(error){
        next(error)
    }
}

const updateListing=async(req,res,next)=>{
    try{
        const updateListing=await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true});
        Helper.fMsg(res, true, " Updated Successfully", updateListing);

    }catch(error){
        next(error)
    }
}

const getListing=async(req,res,next)=>{
    const listing=await Listing.findById(req.params.id);
    try{
        if(!listing){
            Helper.fMsg(res, false, " Listing not found", listing); 
        }
        Helper.fMsg(res, true, " ", listing); 
    }catch(error){
        next(error)
    }
}

const getListings=async(req,res,next)=>{
    try{
        const limit=parseInt(req.query.limit) || 9 ;
        const startIndex=parseInt(req.query.startIndex) || 0;
        let offer=req.query.offer;
      
        if(offer===undefined || offer==="false"){
            offer={ $in : [false , true]};
        }
        let furnished=req.query.furnished;
        if(furnished===undefined || furnished==="false"){
            furnished={ $in : [false , true]};
        }
        let parking=req.query.parking;
        if(parking===undefined || parking==="false"){
            parking={ $in : [false , true]};
        }
        let type=req.query.type;
        if(type===undefined || type==="all"){
            type={ $in : ["sale" , "rent"]};
        }

        const searchTerm=req.query.searchTerm || "";
        const sort=req.query.sort || "createdAt";
        const order=req.query.order  || "desc";
       
        const listings=await Listing.find({
            name:{$regex : searchTerm ,$options:"i"},
            offer,
            furnished,
            parking,
            type,
        }).sort(
            {[sort]:order}
        ).limit(limit).skip(startIndex);
        Helper.fMsg(res, true, " ", listings); 


    }catch(error){
        next(error)
    }
}

module.exports = {
    createListing,
    deleteListing,
    updateListing,
    getListing,
    getListings
   
  };
  