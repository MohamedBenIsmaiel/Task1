const router = require('express').Router();
const validObjectId = require('mongoose').Types.ObjectId;

const {Students,validateStudents} = require('../model/student');
const upload = require('../config/fileUploadeConfig')




//get all student
router.get('/list',async(req,res,next)=>{
    let students = await Students.find({}).select('-password').sort()
    res.status(200).send({
        success:true,
        Count:students.length,
        students:students
  })
});

//get a student by id
router.get('/list/:id',async(req,res,next)=>{
    if(!(validObjectId.isValid(req.params.id))) return res.status(400).send("Invalid student ID");
    
    let student = await Students.findOne({_id:req.params.id}).select('-password').sort()
    if(!student)return  res.status(404).send('No Student with this ID')
    res.status(200).send({
        success:true,
        student:student
  })
});



//insert a student
router.post('/insert',upload,async(req,res,next)=>{
    let {error} = validateStudents(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let student = await Students.findOne({username:req.body.username});
    if(student) return res.status(400).send("The username should be unique")

     student = await Students.findOne({email:req.body.email});
    if(student) return res.status(400).send("the email is already registred in our Database")

    if(!req.file) return res.status(400).send('You should Upload your Image with extenison JPG or PNG and size equal to or less than 300KB');
    if(req.file.size > 300000) return res.status(400).send("The Image size should be equal to or less than 300KB")

     student = new Students({
         username:req.body.username,
         firstName:req.body.firstName,
         lastName:req.body.lastName,
         email:req.body.email,
         password:req.body.password,
         avatar:req.file.filename
     });
     
     await student.save();
    res.status(200).send({
        success:true,
        Message:"student has been inserted",
        student:student
    })
})


//update a student
router.put('/update/:id',upload,async(req,res,next)=>{
    
    if(!(validObjectId.isValid(req.params.id))) return res.status(400).send("Invalid student ID");
    // let {error} = validateStudents(req.body);
    // if(error) return res.status(400).send(error.details[0].message);
    
    let student = await Students.updateOne({_id:req.params.id},req.body);
    res.status(200).send({
        success:true,
        Message:"student has been updated"
    })
});

//delete a student
router.delete('/delete/:id',async(req,res,next)=>{
    if(!(validObjectId.isValid(req.params.id))) return res.status(400).send("Invalid student ID");

    let student = await Students.deleteOne({_id:req.params.id});
    res.status(200).send({
        success:true,
        Message:"Student has been deleted"
       
    })
})
module.exports = router;
