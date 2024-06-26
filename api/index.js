import express, { application } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import signupRoute from "./routes/signup.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import path from "path";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

//initialize the app
const app = express();

//parse cookies to veirfy users
app.use(cookieParser());

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

//listing the properties
app.use("/api/listing", listingRouter);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// create a middleware to handle errors in apis
//err = error sent to middleware
//req = data from client
//res = response from server to client side
//next = go to next middleware
app.use((err, req, res, next) => {
  //whichever statuscode we get or the sever errpr statuscode
  const statusCode = err.statusCode || 500;
  // get the error message
  const message = err.message || "Internal Server Error";

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
