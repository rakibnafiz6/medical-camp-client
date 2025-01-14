import { createContext, useEffect, useState } from "react";
import auth from "../firebase.init";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";


export const AuthContext = createContext(null);


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