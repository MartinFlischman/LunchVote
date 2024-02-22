import { initializeApp } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-app.js";
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.20.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://lunchvote-bd339-default-rtdb.firebaseio.com/"
};
// Initialize Firebase app
const app = initializeApp(firebaseConfig);
// Get a reference to the Firebase Realtime Database
const database = getDatabase(app);
// Create a reference to the 'places' node in the database
const placesRef = ref(database, "places");

// Page Elements
const placeForm = document.getElementById('placeForm');
const placesList = document.getElementById('placesList');
const placeInput = document.getElementById('placeInput');
const leadingPlaceDisplay = document.getElementById('leadingPlace');

// Event listener for form submission
placeForm.addEventListener('submit', (e) => {
    e.preventDefault();
  // Get the input value (name of the lunch place)
    const placeName = placeInput.value.trim();
    if (placeName) {
    // Push the new place to Firebase with initial votes of 0
    push(placesRef, { name: placeName, votes: 0 });
    }
  placeInput.value = ''; // Clear the input field after submission
});

// Listen for real-time updates from Firebase
onValue(placesRef, (snapshot) => {
  placesList.innerHTML = ''; // Clear existing list
    let leadingPlace = { name: '', votes: -1 };

    snapshot.forEach((childSnapshot) => {
    const place = childSnapshot.val();
    const placeKey = childSnapshot.key;

    // Create list item for each place
    const listItem = document.createElement('li');
    listItem.textContent = `${place.name} - Votes: ${place.votes}`;
    listItem.style.cursor = 'pointer';
    listItem.addEventListener('click', () => {
      // Increment the vote count in Firebase
        update(ref(database, `places/${placeKey}`), { votes: place.votes + 1 });
    });

    placesList.appendChild(listItem);

    // Update leading place
    if (place.votes > leadingPlace.votes) {
        leadingPlace = { name: place.name, votes: place.votes };
    }
    });

  // Display the leading place
    if (leadingPlace.votes > -1) {
    leadingPlaceDisplay.textContent = `Leading Place: ${leadingPlace.name} with ${leadingPlace.votes} votes`;
    }
});
