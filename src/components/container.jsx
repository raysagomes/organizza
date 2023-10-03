import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useEffect, useState } from 'react';
import React from 'react';


function Container1() {
    return (
      <Container className='container-main'>
        <Row>
          <Col>       <Image id="celular" src="/celular.png" alt="Celular" />       </Col>

          <Col >
          <div className='div-card'> 
          <Card style={{ width: '500px' }}>
      <Card.Body className='Card1' >
        <Card.Title>     Bom dia,</Card.Title>
        <Card.Subtitle className="mb-2 text-muted"> User,</Card.Subtitle>
        <Card.Text className='card-saldo'>
        Saldo

        </Card.Text>
        </Card.Body >
    </Card>
</div>

      
    </Col>
        </Row>
    
      </Container>
    );
  }
 

  
  export default Container1;