const express = require("express");
const {Student , validateData} = require('../models/studentModel')
const app = express();
app.use(express.json())



const router = express.Router();  // use express.Router() , add all apis - get / put / delete to router . import router in app.js

router.get("/", async (req, res) => {
    let students = await Student.find();
    res.send(students);
});

router.post("/", async (req, res) => {
   const {error} =  validateData(req.body);
   if(error) res.status(400).send(error.details[0].message)
  const student = new Student({name:req.body.name , phone : req.body.phone})
  
 await student.save();
  res.send(student);   
});

router.put("/:id", async (req, res) => {

  let student = await Student.findById(req.params.id)
  if (!student) return res.status(404).send("The student is not found");
 else{ student.name = req.body.name;
 await student.save();
  res.send(student)
 }
});

router.delete("/:id", async (req, res) => {
 const course = await Student.findByIdAndDelete(req.params.id);
res.send(course);
});

router.get("/:id", async (req, res) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).send("The student is not found");
  res.send(student);
});



module.exports =router;
