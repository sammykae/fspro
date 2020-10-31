import firebase from 'firebase'

let firebaseConfig = {
    apiKey: "AIzaSyDFXHkxs0Ia423lGjPPbeyJ3YQCSVknj4I",
    authDomain: "fspro-70f40.firebaseapp.com",
    databaseURL: "https://fspro-70f40.firebaseio.com",
    projectId: "fspro-70f40",
    storageBucket: "fspro-70f40.appspot.com",
    messagingSenderId: "105158729204",
    appId: "1:105158729204:web:8eba0d3c6d93ebb23aeda1"
  };
  // Initialize Firebase
  const fire =firebase.initializeApp(firebaseConfig);

 export default fire