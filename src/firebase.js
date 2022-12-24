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
  deleteUser,
} from "firebase/auth";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import {
  getFirestore,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  serverTimestamp,
  Timestamp,
} from "@firebase/firestore";
import { Route, Link } from "react-router-dom";

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
export const storage = getStorage();
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

    return window.location.assign("posts_Page");
  } catch (error) {
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
  }
}

export async function creatUserAndUserDoc(
  email,
  password,
  fullName,
  birthDate
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);

    const user = getLoggedInUser();
    const usersListRef = doc(db, "Users", user.uid);

    await setDoc(usersListRef, {
      fullName: fullName,
      dateOfBirth: Timestamp.fromDate(new Date(birthDate)).toDate(),
      createdAt: serverTimestamp(),
      email: email,
      user_ID: user.uid,
      joinPlatform: "Web",
      isAdmin: false,
    });

    localStorage.setItem("User Auth", JSON.stringify(user));

    const userData = await getUserData();
    localStorage.setItem("User Data", JSON.stringify(userData));

    alert("User data added successfully!");
    window.location.assign("posts_Page");
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
    return <Link to="/" />;
  } catch (error) {
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
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
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
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
  try {
    await deleteDoc(doc(db, collectionRef, docId));
    alert("The document was deleted successfully !");
    window.location.reload();
  } catch (error) {
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
  }
}

// deleteUser
export async function deleteUserFirebase() {
  const user = getLoggedInUser();

  try {
    await deleteUser(user);
    await deleteDocument("Users", user.uid).then(() => {
      alert("User deleted successfully");
      window.location.assign("/");
    });
  } catch (error) {
    alert(
      "Error Code: " + error.code + "\nError message: '" + error.message + "'"
    );
  }
}

//Upload image
export async function uploadImage() {
  console.log("🚀 - uploadImage - crypto.randomUUID()", crypto.randomUUID());
}
