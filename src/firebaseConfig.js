import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyAXHVSJcx5c_3_KuAclPqjrnhuRVOGQRDo",
    authDomain: "bananareact-97830.firebaseapp.com",
    projectId: "bananareact-97830",
    storageBucket: "bananareact-97830.appspot.com",
    messagingSenderId: "738371422149",
    appId: "1:738371422149:web:61c60368b457a876a4edac",
    measurementId: "G-93J65T6J4C"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getDatabase(app);

export { auth, provider, db };