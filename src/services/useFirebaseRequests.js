"use client";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseAuth";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  toastErrorNotify,
  toastSuccessNotify,
  toastWarnNotify,
} from "../helpers/toastNotify";
import { setCurrentUser, clearCurrentUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
const useFirebaseRequests = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    userObserver();
  }, []);
  const createUser = async (email, password, displayName) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });
      router.push("/login");
      toastSuccessNotify("Registered successfully!");
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };

  const signIn = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
      toastSuccessNotify("Logged in successfully!");
    } catch (err) {
      toastErrorNotify(err.message);
    }
  };
  const logOut = () => {
    signOut(auth);
    dispatch(clearCurrentUser());
    toastSuccessNotify("Logged out successfully!");
  };
  const userObserver = () => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const { email, displayName, photoURL } = currentUser;
        dispatch(setCurrentUser({ email, displayName, photoURL }));
        sessionStorage.setItem(
          "user",
          JSON.stringify({ email, displayName, photoURL })
        );
      } else {
        // User is signed out
        dispatch(clearCurrentUser());
        sessionStorage.clear();
      }
    });
  };
  const signUpProvider = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result);
        router.push("/profile");
        toastSuccessNotify("Logged in successfully!");
      })
      .catch((error) => {
        toastErrorNotify(error.message);
      });
  };
  const forgotPassword = (email) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toastWarnNotify("Please check your mail box!");
      })
      .catch((err) => {
        toastErrorNotify(err.message);
      });
  };
  return {
    createUser,
    signIn,
    logOut,
    userObserver,
    signUpProvider,
    forgotPassword,
  };
};

export default useFirebaseRequests;
