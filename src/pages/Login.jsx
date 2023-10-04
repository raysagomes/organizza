import React from 'react'
import { useRef } from 'react';
import { auth } from '../firebase/Firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';
import  {Button, Container, Row, Col, Form}  from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Link from 'next/link';
import { useRouter } from 'next/router'; 


const login = () => {

    
const lemailRef = useRef();
const lpasswordRef = useRef();
const router = useRouter(); 


 const login = (e) => {
    e.preventDefault();

    const email = lemailRef.current.value;
    const password = lpasswordRef.current.value;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
          const user = userCredential.user;
          //...
        console.log(user);
        alert("Login correto")
        router.push('./principal'); 

    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)

    });

 }
 const estiloDoBotao = {
    backgroundColor: '#6CB2C1',
    border: 'none',
    textDecoration: 'none',
  }

  return (
    <> 

<div className='container text-center coluna-login-2'>
        <Row className='row justify-content-center'>
            <Col className='coluna-login-r1 col'>
            <h1 className='h1-login1'>  Seja bem vindo de volta! </h1>  </Col>
    
            <Col className='coluna-login-r2 flex-grow-3' sm={6}>
           <p className='p-login'> Digite o seu e-mail e senha para continuar e acessar sua plataforma</p>
        
         <Form onSubmit={login}>
    
    <Form.Group className="inputLogin mb-3" controlId="exampleForm.ControlInput1" >
                  <Form.Label></Form.Label>
    <Form.Control type="email" placeholder="name@example.com" 
                  style={{ backgroundColor: '#f0f0f0', border: 'none' }}  
                  ref={lemailRef} 
                  /> 
    </Form.Group> 
          <Form.Label htmlFor="inputPassword5"  ></Form.Label>
    
    <Form.Control
         className="inputPass"
                  type="password"
                  id="inputPassword5"
                  placeholder="Password"
                  aria-describedby="passwordHelpBlock"
                  ref={lpasswordRef}
                  style={{ backgroundColor: '#f0f0f0', border: 'none' }}  />
    <Button type='submit' className='button-login2' style={estiloDoBotao} > Login </Button>
    </Form>
    </Col>
    </Row>

    </div>                    

    
    </>
  )

};

export default login;