// firebase/firestore.js
import { getFirestore } from 'firebase/firestore';
import firebaseApp from './Firebase';

const firestore = getFirestore(firebaseApp);

export default firestore;
