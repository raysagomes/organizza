import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import { db, auth, firestore } from '../firebase/Firebase';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
