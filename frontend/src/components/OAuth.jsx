import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import { getAuth } from "firebase/auth";
import { UseDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice";

export default function OAuth() {
  const handleGoogleClick = async (e) => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      console.log(result);

      const res = await fetch("/api/auth/google", {
        method: "POST",
        headers: {
          "content-type": "/application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          profilePic: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatchEvent(signInSuccess(data));
    } catch (error) {
      console.log("Could Not Sign in with google", error);
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
    >
      Continue With Google
    </button>
  );
}
