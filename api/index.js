import express from "express";

//initialize the app
const app = express();

//methods to use
//listen to port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
