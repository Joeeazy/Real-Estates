import express from "express";
import { test, updateUser } from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

// initialize the route
const userRouter = express.Router();

// the api route test = controller
userRouter.get("/test", test);

userRouter.post("/update/:id", verifyUser, updateUser);

export default userRouter;
