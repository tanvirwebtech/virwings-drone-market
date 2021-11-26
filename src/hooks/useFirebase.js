import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";

import { useEffect, useState } from "react";
import { InitializeAuth } from "../Firebase/init.firebase";

// Auth initialization
InitializeAuth();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [admin, setAdmin] = useState(false);
  const googleProvider = new GoogleAuthProvider();

  const auth = getAuth();

  // Sign up With Email and Password
  const signUpWithEmail = (email, pass, name, history) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        const newUser = { email, displayName: name };
        setUser(newUser);
        //
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {})
          .catch((error) => {});

        setUser(result.user);
        saveUser(name, email, "POST");
      })
      .finally(() => {
        history.replace("/");
        setIsLoading(false);
      });
  };

  // Sign in with Email and Password
  const signInWithEmail = (email, pass, history, location) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, pass)
      .then((result) => {
        setUser(result.user);
        if (location?.state?.from) {
          history.replace(location.state.from);
        } else {
          history.replace("/");
        }
      })
      .catch((error) => {});
  };

  // Google Sign in
  const signInUsingGoogle = (location, history) => {
    setIsLoading(true);
    signInWithPopup(auth, googleProvider).then((result) => {
      saveUser(result.user.displayName, result.user.email, "PUT");
      if (location?.state?.from) {
        history.replace(location.state.from);
      } else {
        history.replace("/");
      }
    });
  };

  // Save user to DB
  const saveUser = (displayName, email, method) => {
    const user = { displayName, email };
    fetch("https://nameless-lowlands-17762.herokuapp.com/users", {
      method: method,
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then();
  };

  // Check Admin
  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nameless-lowlands-17762.herokuapp.com/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setAdmin(data.admin);
        setIsLoading(false);
      });
  }, [user.email]);

  // Log out
  const logOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {})
      .finally(() => setIsLoading(false));
  };

  // Observer Function
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser({});
      }
      setIsLoading(false);
    });
  }, [auth]);

  return {
    user,
    signInUsingGoogle,
    signInWithEmail,
    logOut,
    setErr,
    signUpWithEmail,
    err,
    admin,
    setUser,
    isLoading,
    setIsLoading,
  };
};

export default useFirebase;
