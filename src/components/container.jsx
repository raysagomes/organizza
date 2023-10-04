import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import React from 'react';


function Container1() {
    return (
      <Container className='container container-main'>
        <Row className='row justify-content-center'>
          <Col className='col'>       <Image id="celular" src="/celular.png" alt="Celular" />       </Col>

          <Col  className='col'>
          <Card className='card card-principal'>
      <Card.Body className='Card1' >
        <Card.Title>     Bom dia,</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> User,</Card.Subtitle>
        <Card.Text className='card-saldo'>
        Saldo

        </Card.Text>
        </Card.Body >
    </Card>
    </Col>
        </Row>
    
      </Container>
    );
  }
 

  
  export default Container1;