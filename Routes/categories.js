const express = require("express");
const Joi = require("joi");
const app = express();
app.use(express.json())


const router = express.Router();  // use express.Router() , add all apis - get / put / delete to router . import router in app.js
let categories = [
  { id: 1, name: "Web" },
  { id: 2, name: "Mobile" },
  { id: 3, name: "Photography" },
];

router.get("/api/categories", (req, res) => {
  res.send(categories);
});

router.post("/api/categories", (req, res) => {
   const {error} =  validateData(req.body);
   if(error) res.status(400).send(error.details[0].message)
  const category = {
    id: categories.length + 1,
    name: req.body.name,
  };
  
  categories.push(category);
  res.send(categories);   
});

router.put("/api/categories/:id", (req, res) => {
  let category = categories.find((c) => c.id == parseInt(req.params.id));
  if (!category) return res.status(404).send("The category is not found");
  category.name = req.body.name;
  res.send(categories)
});

router.delete("/api/categories/:id", (req, res) => {
  let category = categories.find((c) => c.id == parseInt(req.params.id));
  if (!category) return res.status(404).send("The category is not found");
  const index = categories.indexOf(category);
  categories.splice(index, 1);
  res.send(categories);
});

router.get("/api/categories/:id", (req, res) => {
  const category = categories.find((c) => c.id == parseInt(req.params.id));
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
