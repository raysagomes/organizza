import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../components/header';
import Container1 from '../components/container';
import Lista from '../components/lista'
import H1 from '../components/h1'
import Footer from '../components/footer'
import Carteira from './carteira';
import { useEffect, useState } from 'react';
import { auth } from './Firebase';



function Principal() {
  return (
    <>
    <Header />
    <Container1 />
    <H1 />
    <Lista />
    <Footer />
  </>

  );
}
export default Principal;
