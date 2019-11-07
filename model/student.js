const mongoose = require('mongoose');
const Joi      = require('joi');

const studentSchema = require('mongoose').Schema;
const Student = new studentSchema({
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:6,
        required:true
    },
    avatar:{
        type:String
    }

})

function validateStudents(student){
    const Schema = {
        username:Joi.string().required(),
        firstName:Joi.string().required(),
        lastName:Joi.string().required(),
        email:Joi.string().required().email(),
        password:Joi.string().min(6).required(),
        avatar:Joi.string()
    }
    return Joi.validate(student,Schema);
}

const Students = mongoose.model('student', Student);
exports.Students = Students;

exports.validateStudents = validateStudents;
