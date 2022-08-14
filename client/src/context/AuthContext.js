import React, { useContext, useState, useEffect } from "react";

// import item from firebase config file
import { auth } from "../config/firebase";

// firebase import
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

const AuthContext = React.createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  // by default we are loading
  const [curUsername, setCurUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logout = (email) => {
    return signOut(auth, email);
  };
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    setCurUsername,
    curUsername,
  };
  return (
    <AuthContext.Provider value={value}>
      {/* If we are not loading then we want to render out the children */}
      {!loading && children}
    </AuthContext.Provider>
  );
};
