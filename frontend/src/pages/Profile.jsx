import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);

  const [photo, setPhoto] = useState(undefined);

  const [photopercentage, setPhotoPercentage] = useState(0);

  const [photoUploadError, setPhotoUploadError] = useState(false);

  const [formData, setFormData] = useState({});

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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">My Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setPhoto(e.target.files[0])}
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePic || currentUser.profilePic}
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
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="email..."
          id="email"
          className="border p-3 rounded-lg"
        />
        <input
          type="text"
          placeholder="password..."
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          UPDATE
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
