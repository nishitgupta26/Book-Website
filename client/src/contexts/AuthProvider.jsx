import React from "react";
import { createContext } from "react";
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import app from "../firebase/firebase.config";
import { useState } from "react";
import { useEffect } from "react";

export const AuthContext = createContext();
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
//   const signUpWithGmail = () => {
//     setLoading(true);
//     signInWithPopup(auth, googleProvider).then((result) => {
//         // Check if the email domain is @lnmiit.ac.in
//         if (!result.user.email.endsWith("lnmiit.ac.in")) {
//           // If not, sign out the user and throw an error
//           signOut(auth);
//           throw new Error("Invalid email domain. Please use an @lnmiit.ac.in email.");
//         }
//         else{
//             return result;
//         }
//       });
//   };

  const signUpWithGmail = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
}
  const logOut = () => {
    localStorage.removeItem("genius-token");
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Check if the user is signed in and if their email domain is @lnmiit.ac.in
      if (currentUser && !currentUser.email.endsWith("lnmiit.ac.in")) {
        // If not, sign out the user
        signOut(auth);
        setUser(null);
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    return () => {
        return unsubscribe();
      };
    }, []);

  const authInfo = {
    user,
    loading,
    logOut,
    signUpWithGmail,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
