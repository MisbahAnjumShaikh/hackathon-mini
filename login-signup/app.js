import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  db,
  collection,
  addDoc,
  doc, sendEmailVerification,  getFirestore,  doc,
  setDoc,
} from "./firebase.js";




let login_signupForm = () => {
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("existing user", user);
  } else {
    console.log("user not exists");
  }
});

// signup
let signUp = () => {
  // e.preventDefault();
  let email = document.getElementById("email").value;
  let phNum = document.getElementById("phNum").value;
  let password = document.getElementById("password").value;
  let confirmPass = document.getElementById("confirmPass").value;

  let userData = { username, phNum, email };
  console.log(userData);

  createUserWithEmailAndPassword(auth, email, password)
    .then(async(res) => {
      const user = res.user;

      console.log("new user, Account created successfully!", user);
      // alert("Account created successfully!")

      try {
        const docRef = await addDoc(collection(db, "users"), {
          ...userData,
          uId: user.uid,

        });
        // console.log("user ID",uId)
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

      sendEmailVerification(auth.currentUser).then(() => {
        alert("Email verification sent!");
      });
      
      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log("error", error.code);
    });
  if (password !== confirmPass) {
    alert("Passwords should be identical");
  }
};
let signUpBtn = document.getElementById("signUpBtn");
  signUpBtn.addEventListener("click", signUp);

// login
let login_signIn = () => {
  
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((res) => {
      // alert("Login Successful!")
      console.log("welcome back user, Login Successful!", res.user);

      window.location.href = "../index.html";
    })
    .catch((error) => {
      console.log("Invalid Email or Password");
    });
};

let login_signInBtn = document.getElementById("login_signInBtn");
login_signInBtn.addEventListener("click", login_signIn);

// google signin
let googleSignIn = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log(user);

    })
    .catch((error) => {
      const email = error.customData.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(email, credential);
    });
};

let googleSignInBtn = document.getElementById("googleSignInBtn");
googleSignInBtn.addEventListener("click", googleSignIn);


// forgot password
let resetPassword = () => {
  let resetPassEmail = document.getElementById("resetPassEmail").value;
  sendPasswordResetEmail(auth, resetPassEmail)
    .then(() => {
      alert("Password reset email sent!");
    })
    .catch((error) => {
      console.log("error", error.code);
    });
};

let resetPasswordBtn = document.getElementById("resetPasswordBtn");
resetPasswordBtn.addEventListener("click", resetPassword);

// // logout
// let logOut_signOut = () => {
//   signOut(auth)
//     .then(() => {
//       alert("Thanks for Visiting, Logout successfully");
//     })
//     .catch((error) => {
//       console.log("error", error.code);
//     });
// };

// let logOut_signOutBtn = document.getElementById("logOut_signOutBtn");
// logOut_signOutBtn.addEventListener("click", logOut_signOut);









}