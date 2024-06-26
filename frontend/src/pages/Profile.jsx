import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  updateUserBegin,
  updateUserSuccess,
  updateUserFailure,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOutUserSuccess,
  signOutUserFailure,
  signOutUserStart,
} from "../redux/user/userSlice";

import { app } from "../firebase";
import { Link } from "react-router-dom";
//import { async } from "@firebase/util";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);

  const fileRef = useRef(null);

  const [photo, setPhoto] = useState(undefined);

  const [photopercentage, setPhotoPercentage] = useState(0);

  const [photoUploadError, setPhotoUploadError] = useState(false);

  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [listingsloading, setListingsLoading] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);

  const [userListings, setUserListings] = useState([]);

  const dispatch = useDispatch();

  //console.log(photoUploadError);

  //console.log(photopercentage);

  //console.log(formData);

  useEffect(() => {
    if (photo) {
      handlePhotoUpload(photo);
    }
  }, [photo]);

  //
  const handlePhotoUpload = (photo) => {
    const photoStorage = getStorage(app);
    const photoName = new Date().getTime() + photo.name;
    const storageRef = ref(photoStorage, photoName);
    const uploadTask = uploadBytesResumable(storageRef, photo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //console.log("upload is" + progress + "% done");
        setPhotoPercentage(Math.round(progress));
      },

      (error) => {
        setPhotoUploadError(true);
      },

      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilePic: downloadURL })
        );
      }
    );
  };

  // function to handle input change
  const handleUpdate = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserBegin());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignoutUser = async () => {
    try {
      dispatch(signOutUserStart());

      const res = await fetch("/api/auth/signout");

      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message)); //signOutUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data)); //signOutUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(data.message)); //signOutUserFailure(error.message));
    }
  };

  const handleShowListings = async () => {
    try {
      setListingsLoading(true);
      setShowListingsError(false);
      const res = await fetch(`api/user/listings/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowListingsError(true);
        setListingsLoading(false);
        return;
      }
      setUserListings(data);
    } catch (error) {
      setShowListingsError(true);
    }
  };

  const handleDeleteListing = async (listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      // delete success update listing state
      setUserListings((prev) =>
        prev.filter((listing) => listing._id !== listingId)
      );
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          onChange={(e) => setPhoto(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePic || currentUser.profilePic} //?????????????????
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <p className="text-sm self-center ">
          {photoUploadError ? (
            <span className="text-red-700">
              Error image upload (image must be less than 10mb)
            </span>
          ) : photopercentage > 0 && photopercentage < 100 ? (
            <span className="text-slate-700">
              {" "}
              {`Uploading ${photopercentage}%`}
            </span>
          ) : photopercentage === 100 ? (
            <span className="text-green-700">Image Successfully Uploaded</span>
          ) : (
            ""
          )}
        </p>

        <input
          type="text"
          placeholder="username..."
          defaultValue={currentUser.username}
          className="border p-3 rounded-lg"
          id="username"
          onChange={handleUpdate}
        />

        <input
          type="email"
          placeholder="email..."
          defaultValue={currentUser.email}
          id="email"
          className="border p-3 rounded-lg"
          onChange={handleUpdate}
        />

        <input
          type="password"
          placeholder="password..."
          id="password"
          className="border p-3 rounded-lg"
          onChange={handleUpdate}
        />

        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "loading..." : "UPDATE"}
        </button>
        <Link
          className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95"
          to={"/create-listing"}
        >
          Create Listing
        </Link>
      </form>

      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-700 cursor-pointer"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignoutUser}
          className="text-red-700 cursor-pointer"
        >
          Sign Out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User has been successfully updated" : ""}
      </p>
      <button onClick={handleShowListings} className="text-green-700 w-full">
        Show Listings
      </button>
      <p className="text-red-700 mt-5">
        {showListingsError ? "Error showing listings" : ""}
      </p>

      {userListings && userListings.length > 0 && (
        <div className="flex flex-col gap-4">
          <h1 className="text-center mt-7 text-2xl font-semibold">
            Your Listings
          </h1>
          {userListings.map((listing) => (
            <div
              key={listing._id}
              className="flex border rounded-lg p-3 justify-between items-center gap-4"
            >
              <Link to={`/listing/${listing._id}`}>
                <img
                  className="h-16 w-16 object-contain "
                  src={listing.imageUrls[0]}
                  alt="listing image"
                />
              </Link>
              <Link
                to={`/listing/${listing._id}`}
                className="text-slate-700 font-semibold flex-1 hover:underline truncate"
              >
                <p>{listing.name}</p>
              </Link>
              <div className="flex flex-col font-semibold items-center">
                <button
                  onClick={() => handleDeleteListing(listing._id)}
                  className="text-red-700"
                >
                  DELETE
                </button>
                <Link to={`/update-listing/${listing._id}`}>
                  <button className="text-green-700">EDIT</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
