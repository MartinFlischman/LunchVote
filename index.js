import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://lunchvote-bd339-default-rtdb.firebaseio.com/"
};
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const placesRef = ref(database, "places");

// Page Elements
const placeForm = document.getElementById('placeForm');
const placesList = document.getElementById('placesList');
const placeInput = document.getElementById('placeInput');
const leadingPlaceDisplay = document.getElementById('leadingPlace');