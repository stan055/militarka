import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js"
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js"

const firebaseConfig = {
  apiKey: "AIzaSyAF6voLWZB0gfAX2Phm7WZ-eoehhG_Qodc",
  authDomain: "militarka-61046.firebaseapp.com",
  projectId: "militarka-61046",
  storageBucket: "militarka-61046.appspot.com",
  messagingSenderId: "754089419404",
  appId: "1:754089419404:web:93587ab3969928dd8011a9"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const signIn = async (email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    return user
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    return null
  });

