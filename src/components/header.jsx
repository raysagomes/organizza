import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  return (
    <Navbar expand="lg" className="header1 ">
      <Container bg="primary">
        <Navbar.Brand id="organiza" href="./principal">Organiza</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="botaoLugar ml-auto">
          <Button className="botoes" href="#" variant="info">Quem somos</Button>{' '}
          <Button className="botoes" href="#" variant="info">Meta</Button>{' '}

                       <NavDropdown title={
              <Image
              src='/perfil.jpg'
                              roundedCircle
                width={30}
                height={30}
                alt="Perfil"/> } id="dropdown1 basic-nav-dropdown">

              <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">  Configurações </NavDropdown.Item>
    
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
  );
}

export default Header;