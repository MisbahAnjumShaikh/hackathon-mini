import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCDoU2m0oPLcm_IOAZSHSS22R_28amsVh0",
  authDomain: "module2-minihackathon.firebaseapp.com",
  projectId: "module2-minihackathon",
  storageBucket: "module2-minihackathon.firebasestorage.app",
  messagingSenderId: "497492507996",
  appId: "1:497492507996:web:d9644eb90e313c9f8fd599",
  measurementId: "G-BB9LHX8JZ9"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
 
export{
  db
}