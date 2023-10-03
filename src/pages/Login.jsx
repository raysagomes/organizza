import React from 'react'
import { useRef } from 'react';
import { auth } from './Firebase';
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

    <Container className='coluna-login-2'>
        <Row>
          <div className='div-login-2 d-flex'>
            <Col className='coluna-login-r1 flex-grow-1' sm={2}>
         Seja bem vindo de volta! </Col>
    
            <Col className='coluna-login-r2 flex-grow-3' sm={6}>
              Digite o seu e-mail e senha para continuar e acessar sua plataforma
        
         <Form onSubmit={login}>
    
    <Form.Group className="inputLogin mb-3" controlId="exampleForm.ControlInput1" >
                  <Form.Label></Form.Label>
    <Form.Control type="email" placeholder="name@example.com" 
                  style={{ backgroundColor: '#f0f0f0', border: 'none' }}  
                  ref={lemailRef} /> 
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
    <Button type='submit' className='button-login' style={estiloDoBotao} > Login </Button>
    </Form>
    </Col>
    </div>                    
      </Row>
    
    
      </Container> 
    </>
  )

};

export default login;