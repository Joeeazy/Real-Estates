import express from "express";
import {
  deleteUser,
  getUser,
  getUserListings,
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

userRouter.get("/listings/:id/", verifyUser, getUserListings);

userRouter.get("/:id", verifyUser, getUser);

export default userRouter;
