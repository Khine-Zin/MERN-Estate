const Listing = require("../models/listing");
const Helper = require("../utils/helper");
const createListing=async(req,res,next)=>{
    try{
        const listing=await Listing.create(req.body);
        Helper.fMsg(res, true, "Listing Created Successful", listing)
    
    }catch(error){
        next(error)
    }
}

module.exports = {
    createListing
  };
  