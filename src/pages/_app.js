import '../styles/globals.css'
import { db, auth, firestore } from './Firebase';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
