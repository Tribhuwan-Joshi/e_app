const express = require("express");
const Joi = require("joi");
const mongoose = require("mongoose");
const app = express();
app.use(express.json())




const router = express.Router();  // use express.Router() , add all apis - get / put / delete to router . import router in app.js
// let categories = [
//   { id: 1, name: "Web" },
//   { id: 2, name: "Mobile" },
//   { id: 3, name: "Photography" },
// ];

const categorySchema = mongoose.Schema({
    name:{type:String , required:true}
})

const Category = mongoose.model('Category' ,categorySchema );

router.get("/api/categories", async (req, res) => {
    let categories = await Category.find();
    res.send(categories);
});

router.post("/api/categories", async (req, res) => {
   const {error} =  validateData(req.body);
   if(error) res.status(400).send(error.details[0].message)
  const category = new Category({name:req.body.name})
  
 await category.save();
  res.send(category);   
});

router.put("/api/categories/:id", async (req, res) => {
    const {error} =  validateData(req.body);
    if(error) res.status(400).send(error.details[0].message)
  let category = await Category.findById(req.params.id)
  if (!category) return res.status(404).send("The category is not found");
 else{ category.name = req.body.name;
 await category.save();
  res.send(category)
 }
});

router.delete("/api/categories/:id", async (req, res) => {
 const course = await Category.findByIdAndDelete(req.params.id);
res.send(course);
});

router.get("/api/categories/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("The category is not found");
  res.send(category);
});

function validateData(category){
    const schema =Joi.object({
        name:Joi.string().min(3).required()
    })
    return schema.validate(category)
}

module.exports =router;
