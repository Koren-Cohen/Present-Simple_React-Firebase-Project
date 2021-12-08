// Font Awesome Source
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleRight } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../../firebase';

const Nav_Bar = () => {
  const currentUser = useAuth();

  return (
    <div className="nav_Bar_Font">
      <Navbar bg="my-Blue" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img alt="navLogo" src="./images/icons/favicon.ico" width="30px" height="30px" className="d-inline-block align-top" />{' '}
            <b>
              Present <FontAwesomeIcon icon={faArrowAltCircleRight} /> Simple
            </b>
          </Navbar.Brand>{' '}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" bg="light">
              <Nav.Link as={Link} to={'/'}>
                <FontAwesomeIcon icon={faHome} /> HOME
              </Nav.Link>
              <Nav.Link as={Link} to={'/about'}>
                <FontAwesomeIcon icon={faInfoCircle} /> ABOUT US
              </Nav.Link>
              <Nav.Link as={Link} to={'/login'}>
                <FontAwesomeIcon icon={faSignInAlt} /> LOGIN
              </Nav.Link>
              <Nav.Link as={Link} to={'/signup'}>
                <FontAwesomeIcon icon={faUserPlus} /> SIGN UP
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <div id="logged_User">
            <b>Logged in user:</b> {currentUser?.email}{' '}
          </div>
        </Container>
      </Navbar>
    </div>
  );
};

export default Nav_Bar;
