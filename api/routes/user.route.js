import express from "express";
import {
  deleteUser,
  test,
  updateUser,
} from "../controllers/user.controller.js";
import { verifyUser } from "../utils/verifyUser.js";

// initialize the route
const userRouter = express.Router();

// the api route test = controller
userRouter.get("/test", test);

userRouter.post("/update/:id", verifyUser, updateUser);

userRouter.delete("/delete/:id", verifyUser, deleteUser);

export default userRouter;
