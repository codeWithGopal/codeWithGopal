import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2SXwiyENic0mucw--msI1yi6WWffo_c4",
  authDomain: "gk-crwn-clothing-db.firebaseapp.com",
  projectId: "gk-crwn-clothing-db",
  storageBucket: "gk-crwn-clothing-db.appspot.com",
  messagingSenderId: "419831982344",
  appId: "1:419831982344:web:230044ddd2ca51f78e64bd",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());
  //if user data does not exists
  // create/set the document with the data from userAuth in my collection

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log(`error creating the user`, error.message);
    }
  }

  // if user data exists

  //return userDocRef

  return userDocRef;
};
