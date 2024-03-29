import express, { application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signupRoute from "./routes/signup.route.js";
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

//allows sending of JSON data to the server
app.use(express.json());

//methods to use
//listen to port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

// create a test api route
// req = data from client side request
// res = data from server side response
// app.get("/test", (req, res) => {
//   res.json({
//     message: "Hello world!",
//   });
// });

// all routes defined in index.js
// userRouter = routes in user.rote.js
//api/user/test = route  test(use)
app.use("/api/user", userRouter);

app.use("/api/auth", signupRoute);
