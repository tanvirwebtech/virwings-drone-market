import { initializeApp } from "firebase/app";
import firebaseConfig from "./config.firebase";
export const InitializeAuth = () => initializeApp(firebaseConfig);
