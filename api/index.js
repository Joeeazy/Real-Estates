import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

//initialize the app
const app = express();

//methods to use
//listen to port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});
