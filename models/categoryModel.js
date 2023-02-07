const Joi = require("joi");
const mongoose = require("mongoose");
const categorySchema = mongoose.Schema({
    name:{type:String , required:true}
})

const Category = mongoose.model('Category' ,categorySchema );
function validateData(category){
    const schema =Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(category)
}

exports.Category = Category;
exports.validateData = validateData;