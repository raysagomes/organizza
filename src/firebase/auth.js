// firebase/auth.js
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from './Firebase';

const auth = getAuth(firebaseApp);

export default auth;
