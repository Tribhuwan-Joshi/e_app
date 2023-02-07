const express = require("express");
const {Category , validateData} = require('../models/categoryModel')

const app = express();
app.use(express.json())




const router = express.Router();  // use express.Router() , add all apis - get / put / delete to router . import router in app.js

router.get("/", async (req, res) => {
    let categories = await Category.find();
    res.send(categories);
});

router.post("/", async (req, res) => {
   const {error} =  validateData(req.body);
   if(error) res.status(400).send(error.details[0].message)
  const category = new Category({name:req.body.name})
  
 await category.save();
  res.send(category);   
});

router.put("/:id", async (req, res) => {
    const {error} =  validateData(req.body);
    if(error) res.status(400).send(error.details[0].message)
  let category = await Category.findById(req.params.id)
  if (!category) return res.status(404).send("The category is not found");
 else{ category.name = req.body.name;
 await category.save();
  res.send(category)
 }
});

router.delete("/:id", async (req, res) => {
 const course = await Category.findByIdAndDelete(req.params.id);
res.send(course);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) return res.status(404).send("The category is not found");
  res.send(category);
});



module.exports =router;
