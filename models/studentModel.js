const Joi = require("joi");
const mongoose = require("mongoose");
const studentSchema = mongoose.Schema({
    name:{type:String , required:true},
    phone : {type:String , required:true},
    isEnrolled : {type : Boolean , default : false}
})

const Student = mongoose.model('Student' ,studentSchema );
function validateData(student){
    const schema =Joi.object({
        name:Joi.string().min(3).max(30).required(),
        phone : Joi.string().min(10).max(15).required(),
        isEnrolled : Joi.boolean()
    })
    return schema.validate(student)
}

exports.Student = Student;
exports.validateData = validateData;