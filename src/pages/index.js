import Image from 'next/image'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './signup';
import login from './Login';
import Link from 'next/link'
import { initializeApp } from "firebase/app";


export default function Home() {
  return (
    <>
    < Signup/>
    </>
  )
}
