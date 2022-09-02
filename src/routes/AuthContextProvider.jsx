import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import {
  GoogleAuthProvider, signInWithPopup, onAuthStateChanged, setPersistence, browserLocalPersistence,
} from 'firebase/auth';
import { auth } from '../utils/firebase.utils';

// context to pass to components without trickling
const AuthContext = createContext();

// export context
export const useAuth = () => useContext(AuthContext);

// provides auth wrapper
export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentIdToken, setCurrentIdToken] = useState(null);

  // sets restrictions on the auth provider (only tdsb domains can login)
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
    hd: 'tdsb.on.ca',
  });

  // provides default login with google method, persists until user clicks logout
  const loginWithGoogle = () => {
    setPersistence(auth, browserLocalPersistence).then(() => signInWithPopup(
      auth,
      provider,
    ));
  };

  // signout method
  const logout = () => auth.signOut();

  // gets the current user
  const getCurrentUser = () => auth.currentUser;




  // sets the updated user everytime a component loads
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoggedIn(!!user);
      auth.currentUser.getIdToken(true).then((idToken) => {
        setCurrentIdToken(idToken);
      });
    });

    return () => unsubscribe();
  }, []);

  // wrap children in the auth provider so each child can access the user context
  return (
    <AuthContext.Provider value={{
      currentUser, getCurrentUser, currentIdToken, loggedIn, loginWithGoogle, logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
