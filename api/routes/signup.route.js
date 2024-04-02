import express from "express";
import {
  signup,
  signin,
  google,
  signOut,
} from "../controllers/signup.controller.js";

//the router initalized
const signupRoute = express.Router();

// signup post request
signupRoute.post("/signup", signup);

//sigin post request
signupRoute.post("/signin", signin);

//google route = authentication
signupRoute.post("/google", google);

//signout resquest
signupRoute.get("/signout", signOut);

export default signupRoute;
