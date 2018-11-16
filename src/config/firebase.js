import firebase from 'firebase';
import './auth';
import './db';

const config = {
    apiKey: "AIzaSyC6J6cCrF_F1fCvVPdm53Kmt4pPYkCrLo0",
    authDomain: "mahi-spray-web.firebaseapp.com",
    databaseURL: "https://mahi-spray-web.firebaseio.com",
    projectId: "mahi-spray-web",
    storageBucket: "mahi-spray-web.appspot.com",
    messagingSenderId: "499946044613"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const db = firebase.database();
const auth = firebase.auth();

export { 
    db,
    auth, 
};
