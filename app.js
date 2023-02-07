const express = require("express");
const app = express();
const mongoose  = require('mongoose');
const categories = require('./Routes/categories');   // import router with route name
const students = require('./Routes/students');   // import router with route name


mongoose.connect('mongodb+srv://tjsm:atlaspasswd@courseapi.z5wgtjg.mongodb.net/?retryWrites=true&w=majority').then(()=>console.log("Connection successful")).catch(err=>console.error("Couldn't connect to monogodb",err));



app.use(express.json());
app.use('/api/categories' ,categories);  // routes
app.use('/api/students' ,students);  // routes

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});


