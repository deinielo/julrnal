import { initializeApp } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCKJeDvolYwXuWmxDhDrbuUh96NoQ9Q-o0",
    authDomain: "arte-y-psicologia.firebaseapp.com",
    projectId: "arte-y-psicologia",
    storageBucket: "arte-y-psicologia.firebasestorage.app",
    messagingSenderId: "614404666218",
    appId: "1:614404666218:web:35847a3ffaf053624feb13"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
