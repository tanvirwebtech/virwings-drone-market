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
InitializeAuth();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [err, setErr] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();

    const auth = getAuth();

    // Sign up With Email and Password
    const signUpWithEmail = (email, pass, name) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, pass)
            .then((result) => {
                const newUser = { email, displayName: name };
                setUser(newUser);
                console.log(newUser);
                //
                updateProfile(auth.currentUser, {
                    displayName: name,
                })
                    .then(() => {})
                    .catch((error) => {});

                setUser(result.user);
                console.log(result.user);
            })
            .finally(() => {
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
                console.log(result.user);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    // Google Sign in
    const signInUsingGoogle = () => {
        setIsLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // Log out
    const logOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => {})
            .finally(() => setIsLoading(false));
    };

    // Observer Function
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({});
            }
            setIsLoading(false);
        });
        return () => unsubscribed;
    }, []);

    return {
        user,
        signInUsingGoogle,
        signInWithEmail,
        logOut,
        setErr,
        signUpWithEmail,
        err,
        setUser,
        isLoading,
        setIsLoading,
    };
};

export default useFirebase;
