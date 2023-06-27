import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCtvpasjQPqrQb74G8fqdPL0LPUFZeHqsM",
  authDomain: "shop-32e23.firebaseapp.com",
  databaseURL: "https://shop-32e23-default-rtdb.firebaseio.com",
  projectId: "shop-32e23",
  storageBucket: "shop-32e23.appspot.com",
  messagingSenderId: "254500408452",
  appId: "1:254500408452:web:e6dc0610fb50ee2336c6d1",
  measurementId: "G-2GFRD44VVN",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const userInfoContainer = document.getElementById("userInfo");
const signOutButton = document.getElementById("SignOutButton");

onAuthStateChanged(auth, (user) => {
  if (user) {
    const { email } = user;
    const userHtml = `
      <p><strong>Email:</strong> ${email}</p>
    `;
    userInfoContainer.innerHTML = userHtml;

    signOutButton.addEventListener("click", () => {
      signOut(auth)
        .then(() => {
          window.location.href = "index.html";
        })
        .catch((error) => {
          console.log("Sign Out Error:", error.message);
        });
    });
  } else {
    window.location.href = "index.html";
  }
});
