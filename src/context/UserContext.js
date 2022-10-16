import React, { createContext, useState, useEffect } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'
import app from '../firebase/firebase.config';


export const AuthContext = createContext()

const auth = getAuth(app)

const googleProvider = new GoogleAuthProvider();

const UserContext = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setloading] = useState(true)


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setloading(false)
            console.log(currentUser);
        })

        return () => {
            unsubscribe()
        }
    }, [])


    const signInWithGoogle = () => {
        return signInWithPopup(auth, googleProvider)
    }


    const logOut = () => {
        return signOut(auth);
    }

    const authInfo = { user, loading, createUser, signIn, logOut, signInWithGoogle }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;