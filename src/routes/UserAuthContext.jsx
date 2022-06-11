/* eslint-disable react/destructuring-assignment */
import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';
import {
  GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut,
} from 'firebase/auth';
import { auth } from '../utils/firebase.utils';


const userAuthContext = createContext();

export function UserAuthContextProvider(props) {
  const [user, setUser] = useState({});

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account',
    hd: 'tdsb.on.ca',
  });
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, provider).then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  };

  const signOutTDSB = async () => {
    await signOut(auth).then((res) => {
      console.log(res);
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const memoizedAuth = useMemo(() => ({ user, signInWithGoogle, signOutTDSB }), []);

  return (
    <userAuthContext.Provider value={memoizedAuth}>
      {props.children}
    </userAuthContext.Provider>
  );
}

export const useUserAuth = () => useContext(userAuthContext);
