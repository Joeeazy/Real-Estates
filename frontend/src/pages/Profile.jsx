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
//import { async } from "@firebase/util";

export default function Profile() {
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [photo, setPhoto] = useState(undefined);

  const [photopercentage, setPhotoPercentage] = useState(0);

  const [photoUploadError, setPhotoUploadError] = useState(false);

  const [formData, setFormData] = useState({});

  const [updateSuccess, setUpdateSuccess] = useState(false);

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
    </div>
  );
}
