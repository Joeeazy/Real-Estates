import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  //send data into the server
  const { username, email, password } = req.body;

  //hash the password using bcryptjs using a salt number
  const hashedPassword = bcryptjs.hashSync(password, 10);

  // create a new user using the user model
  const newUser = new User({ username, email, password: hashedPassword });

  //try and catch to catch any errors during signing up

  try {
    // save it into the DB
    await newUser.save();
    //create a response
    res.status(201).json("User Created successfully");
  } catch (error) {
    res.status(500).json(error.message);
  }
};
