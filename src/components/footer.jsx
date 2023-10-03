import Nav from 'react-bootstrap/Nav';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return(
      
        <Nav className="footer justify-content-center" activeKey="/home">
          <Nav.Item className='nav-link1'>
            <Nav.Link  className='nav-link1  custom-footer-link' href="#" style={{ textDecoration: 'none' }} >Inicio</Nav.Link>
          </Nav.Item>
          <Nav.Item className='nav-link1'>
            <Nav.Link className='nav-link1  custom-footer-link' href="#">Quem somos nós</Nav.Link>
          </Nav.Item>
          
            

        </Nav> 
    );
}

export default Footer;