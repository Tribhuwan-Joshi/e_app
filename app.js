const express = require("express");
const app = express();
const categories = require('./Routes/categories');   // import router with route name
app.use(express.json());
app.use(categories);  // routes

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
