// firebase/database.js
import { getDatabase } from 'firebase/database';
import firebaseApp from './Firebase';

const db = getDatabase(firebaseApp);

export default db;
