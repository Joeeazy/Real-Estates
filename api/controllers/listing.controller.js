//async = await mongoDb

import Listing from "../models/listing.model.js";
import { errorHandler } from "../utils/error.js";

//next = error middleware
export const createListing = async (req, res, next) => {
  try {
    const listing = await Listing.create(req.body);

    return res.status(201).json(listing);
    k;
  } catch (error) {
    next(error);
  }
};

export const deleteListing = async (req, res, next) => {
  //first check if the listing exists or not
  const listing = await Listing.findById(req.params.id);

  // if it does not exist
  if (!listing) {
    return next(errorHandler(404, "Listing not found"));
  }

  //if listing exists check if the user is the owner of the lising
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only delete your listings"));
  }

  // if everything is ok try catch
  try {
    //delete user
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing Has Been Deleted");
  } catch (error) {
    next(error);
  }
};

export const updateListing = async (req, res, next) => {
  //check is listing exists or not
  const listing = await Listing.findById(req.params.id);

  //no listing ? return errorr
  if (!listing) {
    return next(errorHandler(404, "Listing not found!"));
  }

  //check if listing belong to the user
  if (req.user.id !== listing.userRef) {
    return next(errorHandler(401, "You can only update your own listings"));
  }

  //if everything is ok proceed
  try {
    const updatedListing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedListing);
  } catch (error) {
    next(error);
  }
};

export const getListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(400, "Listing Not Found"));
    }
    res.status(200).json(listing);
  } catch (error) {
    next(error);
  }
};
