import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"


const firebaseConfig = {
  apiKey: "AIzaSyCTOnjbycxmn-WT7WkW1XtyZHTXl7dYrlI",
  authDomain: "fir-web-sns-app.firebaseapp.com",
  projectId: "fir-web-sns-app",
  storageBucket: "fir-web-sns-app.appspot.com",
  messagingSenderId: "327865921204",
  appId: "1:327865921204:web:8522b66a2607ba10fff1e1",
  measurementId: "G-MEHX6Y3Y7C"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth,db,storage};