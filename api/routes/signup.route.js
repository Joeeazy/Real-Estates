import express from "express";
import { signup } from "../controllers/signup.controller.js";

const signupRoute = express.Router();

// post request
signupRoute.post("/signup", signup);

export default signupRoute;
