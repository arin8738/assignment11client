/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React, { createContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
// import app from "../../Config/config.firebase";
import axios from "axios";
import { app } from "../../Config/config.firebase";

const auth = getAuth(app);
export const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (loggedUser) =>{
            if(loggedUser){
                setUser(loggedUser);

                axios.post('https://language-master-server-side.vercel.app/jwt', {loggedUser})
                  .then(function (response) {
                    console.log(response.data);
                    localStorage.setItem("access-token", response.data);
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
            }
            else{
                setUser(null);
                localStorage.removeItem("access-token")
                console.log("No user found");
            }
            setLoading(false);
        } )

        return () => unsubscribe();

    }, [])

    const Register = (email, password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const Login = (email, password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const Logout = () =>{
        setLoading(true);
        return signOut(auth);
    }

    const UpdateUser = (name, photoUrl)=>{
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photoUrl
          })
    }

    const LoginWithGoogle = () =>{
        setLoading(true)
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }

    const authInfo = {
        loading, user, Login, Logout, Register, UpdateUser, LoginWithGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
