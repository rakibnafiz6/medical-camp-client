import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import axios from "axios";
import Swal from "sweetalert2";


export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    }

    const signOutUser = () => {
        return signOut(auth);
    }


    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('state change', currentUser);
            setUser(currentUser);
            setLoading(false);
            if (currentUser?.email) {
                axios.post(`${import.meta.env.VITE_API_URL}/users/${currentUser?.email}`, {
                    name: currentUser?.displayName,
                    email: currentUser?.email,
                })
                    .then(res => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Users data stored in db",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }

        })
        return () => {
            unsubscribe();
        }
    }, [])




    const authInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInGoogle,
        signOutUser,
        updateUserProfile
    }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;