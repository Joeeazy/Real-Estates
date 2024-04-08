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

export const getListings = async (req, res, next) => {
  try {
    //pagination??

    //limit the search items by the request query or default = 7
    const limit = parseInt(req.query.limit) || 7;

    //where to strat searching from
    const startIndex = parseInt(req.query.startIndex) || 0;

    //The $in operator selects the documents where the value of a field equals any value in the specified array.
    let offer = req.query.offer;
    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }

    let furnished = req.query.furnished;
    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }

    let type = req.query.type;
    if (type === undefined || type === "all") {
      type = { $in: ["sale", "rent"] };
    }

    //the search term
    const searchTerm = req.query.searchTerm || "";

    //sort
    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";

    const listings = await Listing.find({
      name: { $regex: searchTerm, $options: "i" },
      offer,
      furnished,
      parking,
      type,
    })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json(listings);
  } catch (error) {
    next(error);
  }
};
