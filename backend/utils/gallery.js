const fs = require("fs");

const saveFile = async (req, res, next) => {
 
  if (req.files?.file) {
    let file = req.files.file;
    let filename = file.name;
    file.mv(`./uploads/${filename}`);
    req.body.picture= `http://localhost:3000/uploads/${filename}`;
    next();
  }else{
    next();
  }
 
};

const saveFiles = async (req, res, next) => {

 if(req.files.files){

  let files = req.files?.files;

  if(files.length > 1){
    let filenames = [];
    Array.from(files).forEach(file => {
   
      let filename = file.name;
      file.mv(`./uploads/${filename}`);
      filenames.push(`http://localhost:3000/uploads/${filename}`);
      req.body.imageUrls =filenames ;
    });
  }else if(files.length == undefined){
    let filename = files.name;
   
    files.mv(`./uploads/${filename}`);
    req.body.imageUrls= `http://localhost:3000/uploads/${filename}`;
   
  }
  
 

  next();
 }else{
  next(error)
 }
};

const deletefile = async filename => {
  fs.unlinkSync(`./uploads/${filename}`);
};

module.exports = {
  saveFile,
  saveFiles,
  deletefile,
};
