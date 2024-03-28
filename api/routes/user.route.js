import express from "express";
import { test } from "../controllers/user.controller.js";

// initialize the route
const userRouter = express.Router();

// the api route test = controller
userRouter.get("/test", test);

export default userRouter;
