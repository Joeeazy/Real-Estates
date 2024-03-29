import express from "express";
import { signup, signin } from "../controllers/signup.controller.js";

const signupRoute = express.Router();

// signup post request
signupRoute.post("/signup", signup);
//sigin post request
signupRoute.post("/signin", signin);

export default signupRoute;
