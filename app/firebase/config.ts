import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD4Os0WVrqz04Q_rQMMvYOIS00Hcld5uiE",
  authDomain: "palomnystwocitys.firebaseapp.com",
  projectId: "palomnystwocitys",
  storageBucket: "palomnystwocitys.firebasestorage.app",
  messagingSenderId: "537586522856",
  appId: "1:537586522856:web:48f4a44376364db077475d",
};

export const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
