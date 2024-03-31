import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

//siginup
export const signup = async (req, res, next) => {
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
    next(error);
  }
};

//sigining
export const signin = async (req, res, next) => {
  //destructure email & password
  const { email, password } = req.body;
  try {
    //check if email exists, if email exists check password
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "User Not Found"));

    //check if passwords match
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword)
      return next(errorHandler(401, "Invalid Email or Password"));

    //if both password and email are correct authenticate the user
    //by storing a cookie in the browser using jsonWebToken(jwt)

    //create a token based on their mongoDb id's with a secret in the .env
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);

    //remove password from the data from DB
    const { password: pass, ...rest } = validUser._doc;

    //save token above as a cookie  httpOnly: true makes cookie safe
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest); //separared info after removing the password
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        profilePic: req.body.profilePic,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    next(error);
  }
};

//Google authentication

// export const google = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (user) {
//       const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//       const { password: pass, ...rest } = user._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     } else {
//       const generatedPassword =
//         Math.random().toString(36).slice(-8) +
//         Math.random().toString(36).slice(-8);

//       const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

//       const newUser = new User({
//         userName:
//           req.body.name.split(" ").join("").toLowerCase() +
//           Math.random().toString(36).slice(-4),
//         email: req.body.email,
//         password: hashedPassword,
//         profilePic: req.body.profilePic,
//       });
//       await newUser.save();
//       const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
//       const { password, ...rest } = newUser._doc;
//       res
//         .cookie("access_token", token, { httpOnly: true })
//         .status(200)
//         .json(rest);
//     }
//   } catch (error) {
//     next(error);
//   }
// };
