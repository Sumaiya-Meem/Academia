import { createContext, useState } from "react";
import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut} from 'firebase/auth'

import { useEffect } from "react";
import auth from "../firebase/firebase.config";




export const ContextProvider = createContext()

const googleProvider = new GoogleAuthProvider()

// eslint-disable-next-line react/prop-types
const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    

 
    const createUser = (email, password) =>{
        setLoading(true)
        return  createUserWithEmailAndPassword(auth,email,password);
        
    };

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    const logOutUser = () => {
        setLoading(true);
        return signOut(auth)
    }

    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth, currentUser => {
             setUser(currentUser)
             console.log("Current User ",currentUser)
             setLoading(false)
           });
           return ()=>{
             return unSubscribe();
           }
     },[])


const authInfo = {
      createUser,
      signInUser,
      signInGoogle,
      loading,
      user,
      logOutUser
}

    return (
        <ContextProvider.Provider value={authInfo}>
            {children}
        </ContextProvider.Provider>
    );
};

export default AuthProvider;