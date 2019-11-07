const multer = require('multer');

const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./resource')
    },
    filename:(req,file,cb)=>{
        cb(null,'image-'+new Date().toISOString()+file.originalname);
    }
})
const limits =  {
    files:1,
    fileSize:300000
}

const fileFilter = (req,file,cb)=>{
    
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg'){
        cb(null,true)
    }else{
       return cb(null,false)
    }
}
const upload = multer({storage:fileStorage,limits:limits,fileFilter:fileFilter}).single('file')
module.exports = upload;
