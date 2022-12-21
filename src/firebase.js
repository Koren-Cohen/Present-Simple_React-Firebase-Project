import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { getFirestore, deleteDoc, doc, getDoc } from "@firebase/firestore";

// My web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const storage = getStorage();
export const db = getFirestore(app);

//Sign up function using: createUserWithEmailAndPassword
export async function signup(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log("🚀 - signup - user", user);
  } catch (error) {
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
  }
}

//Login function using: signInWithEmailAndPassword
export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const userAuth = userCredential.user;
    localStorage.setItem("User Auth", JSON.stringify(userAuth));

    const userData = await getUserData();
    localStorage.setItem("User Data", JSON.stringify(userData));
  } catch (error) {
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
  }
}

//Logout function using: signOut
export async function logout() {
  try {
    await signOut(auth);
    localStorage.removeItem("User Auth");
    localStorage.removeItem("User Data");
  } catch (error) {
    console.log("🚀 - logout - error", error);
  }
}

export function getLoggedInUser() {
  const auth = getAuth();
  const user = auth.currentUser;

  return user;
}

export async function getUserData() {
  try {
    const user = getLoggedInUser();

    const docRef = doc(db, "Users", user.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  } catch (error) {
    console.log("Error while tring to get doc data from firestore:", error);
  }
}

// Custom Hook
export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => setCurrentUser(user));
    return unsub;
  }, []);

  return currentUser;
}

// deleteDoc
export async function deleteDocument(collectionRef, docId) {
  await deleteDoc(doc(db, collectionRef, docId))
    .then(() => {
      alert("The document was deleted successfully !");
      window.location.reload();
    })
    .catch(() => {
      alert("Failed to delete the document !");
    });
}

// Storage
export async function upload(file, currentUser, setLoading) {
  const fileRef = ref(storage, currentUser.uid + ".png");

  setLoading(true);

  const snapshot = await uploadBytes(fileRef, file);
  const photoURL = await getDownloadURL(fileRef);

  updateProfile(currentUser, { photoURL });

  setLoading(false);
  alert("Uploaded file!");
}
