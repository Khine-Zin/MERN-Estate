const User = require("../models/user");
const Listing = require("../models/listing");
const Helper = require("../utils/helper");
const bcrypt = require("bcryptjs");

const updateUser = async (req, res, next) => {

   const currentUser = await User.findById(req.params.id);
  if (!currentUser) {
    return Helper.fMsg(res, false, "User not found");
  }

  try {
    if (req.body.passward) {
      req.body.passward = bcrypt.hashSync(req.body.passward);
      }

 if(req.body.email){
      if( req.body.email !== currentUser.email){
        const currentEmail = await User.findOne({email:req.body.email});
        if (currentEmail) {
          return Helper.fMsg(res, false, "Your Email is Alrady use");
        }
      }

    }
   
    const updateUser = await User.findByIdAndUpdate(
      currentUser._id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          passward: req.body.passward,
          picture:req.body.picture,
        },
      },
      { new: true }
    );
    const { passward: pass, ...rest } = updateUser._doc;
    Helper.fMsg(res, true, "Update Successful", rest);
  } catch (error) {
    next(error);
  }
};

const deleteUser=async(req,res,next)=>{

  try{
   const deleteUser= await User.findByIdAndDelete(req.params.id);
   res.clearCookie("access_token");
   Helper.fMsg(res, true, "Delete Successful",deleteUser);
  }catch(error){
    next(error)
  }
}

const getUserListing=async(req,res,next)=>{
    try{
      const listing=await Listing.find({userRef: req.params.id});
      Helper.fMsg(res, true,"",listing);

    }catch(error){
      next(error)
    }
}

const getUser=async(req,res,next)=>{
  try{
    const user=await User.findById(req.params.id);
  if(!user){
    Helper.fMsg(res, false, "User not found");
  
  }
  const { passward: pass, ...rest } = user._doc;
  Helper.fMsg(res, true, "",rest);
  }catch(error){
    next(error)
  }
}

module.exports = {
  updateUser,
  deleteUser,
  getUserListing,
  getUser
};
