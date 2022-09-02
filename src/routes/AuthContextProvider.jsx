import React, {
  createContext, useContext, useEffect, useState,
} from 'react';
import {
  GoogleAuthProvider, signInWithPopup, onAuthStateChanged, setPersistence, browserLocalPersistence,
} from 'firebase/auth';
import axios from 'axios';
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
  const [userData, setUserData] = useState(null);
  const [userProfilePic, setUserProfilePic] = useState(null);

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
    )
      // creates user in database if they don't exist (upserting)
      .then((result) => {
        result.user.getIdToken().then((idToken) => {
          const { user } = result;
          const userEmail = user.email;
          const userPfp = user.photoURL;
          const authToken = idToken;
          let accountType = 'teacher';
          if (userEmail.includes('@student.tdsb.on.ca')) {
            accountType = 'student';
          }
          const reqBody = {
            email: userEmail,
            account_type: accountType,
            profile_pic: userPfp,
          };
          const headers = {
            Authorization: `Bearer ${authToken}`,
          };
          axios.post('http://localhost:8000/api/v0/users/create', reqBody, { headers })
            .then((response) => {
              if (response.data.ok === 'true') {
                setUserData(response.data.newUser);
                setUserProfilePic(userPfp);
              }
            });
        });
      }));
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
      currentUser,
      getCurrentUser,
      currentIdToken,
      loggedIn,
      loginWithGoogle,
      logout,
      userData,
      userProfilePic,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}
