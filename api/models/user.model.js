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
      required: true, //mandatory to enter an emai
      unique: true, //should be unique
    },
    password: {
      type: String, //type string
      required: true, //mandatory to enter a password
    },
    profilePic: {
      type: String,
      default:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjLejMWAMeU8ra4vu2INSgVPe0INxrrV6Emw&s",
    },
  },
  { timestamps: true } //mongoDb should create a CREATED_AT timestamp and UPDATE_AT timestamp
);

// create a model for userSchema
const User = mongoose.model("User", userSchema);

//export the model created above
export default User;
