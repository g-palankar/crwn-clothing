import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBU31qrx2n1QXRYNqxB0jAO-Xi-U7-aBwk",
    authDomain: "crwn-db-a41ba.firebaseapp.com",
    projectId: "crwn-db-a41ba",
    storageBucket: "crwn-db-a41ba.appspot.com",
    messagingSenderId: "100919560996",
    appId: "1:100919560996:web:58cd57f511a4386b01c1b1",
    measurementId: "G-WK4HZNPESX"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log('create user doc called',userAuth, additionalData)
    if (!userAuth) return;
        const userRef = firestore.doc(`/user/${userAuth.uid}`);
        const snapShot = await userRef.get();

        if(!snapShot.exists){

            const {displayName, email}  = userAuth;
            const createdAt = new Date();

            try {
                userRef.set({
                    displayName, email, createdAt, ...additionalData
                })
                
            } catch (error) {
                console.log('there was an error creating user',)
            }

        }
        return userRef;

}

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;


