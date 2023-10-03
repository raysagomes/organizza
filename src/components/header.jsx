import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Button, Image } from 'react-bootstrap';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router'; // Importe useRouter do Next.js
import 'bootstrap/dist/css/bootstrap.min.css';

function Header() {
  const router = useRouter();
  const auth = getAuth(); // Movemos a obtenção da autenticação para fora das funções.

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        router.push('/'); // Redirecione para a página inicial após o logout.
      })
      .catch((error) => {
        console.error("Erro ao fazer logout:", error);
      });
  };

  const handleCadastro = () => {
    router.push('/signup'); // Redireciona para a página de cadastro após o login bem-sucedido.
  };

  return (
    <Navbar expand="lg" className="header1">
      <Container bg="primary">
        <Navbar.Brand id="organiza" href="/principal">
          Organiza
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="botaoLugar ml-auto">
            <Button className="botoes" href="#" variant="info">
              Quem somos
            </Button>{' '}
            <Button className="botoes" href="#" variant="info">
              Meta
            </Button>{' '}
            <NavDropdown
              title={
                <Image
                  src="/perfil.jpg"
                  roundedCircle
                  width={30}
                  height={30}
                  alt="Perfil"
                />
              }
              id="dropdown1 basic-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">Perfil</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Configurações</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
