import firebase from 'firebase'
import Rebase from 're-base'

const firebaseInfo = firebase.initializeApp({
    apiKey: "AIzaSyD7hMRaKCmz0bTLJ2NlKvtXTycbUpTM130",
    authDomain: "projeto-teste-will.firebaseapp.com",
    databaseURL: "https://projeto-teste-will.firebaseio.com",
    projectId: "projeto-teste-will",
    storageBucket: "projeto-teste-will.appspot.com",
    messagingSenderId: "281489678336"
});

const db = firebase.database(firebase)
const config = Rebase.createClass(db)

export const providers = {
    'facebook': new firebase.auth.FacebookAuthProvider,
}

export const auth = firebaseInfo.auth()
export default config