/* eslint-disable no-unused-vars */
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAvXVlI5MNnzZJ8ylCPwtGu-T5W_q-JyfU',
  authDomain: 'theclubs-c7a9c.firebaseapp.com',
  projectId: 'theclubs-c7a9c',
  storageBucket: 'theclubs-c7a9c.appspot.com',
  messagingSenderId: '265586578688',
  appId: '1:265586578688:web:159b1af691d32120110fe5',
  measurementId: 'G-L8KJTGDD6N',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
  hd: 'tdsb.on.ca',
});

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider).then((result) => {
    console.log(result);
  }).catch((error) => {
    console.log(error);
  });
};
