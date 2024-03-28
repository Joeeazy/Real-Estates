import mongoose from "mongoose";

//create a user's schema
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String, //type string
      required: true, //mandatory to enter a userName
      unique: true, //should be unique
    },
    email: {
      type: String, //type string
      required: true, //mandatory to enter a userName
      unique: true, //should be unique
    },
    password: {
      type: String, //type string
      required: true, //mandatory to enter a userName
    },
  },
  { timestamps: true } //mongoDb should create a CREATED_AT timestamp and UPDATE_AT timestamp
);

// create a model
const User = mongoose.model("User", userSchema);

export default User;
