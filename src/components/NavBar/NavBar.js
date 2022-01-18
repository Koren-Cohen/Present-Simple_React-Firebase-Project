// Font Awesome Source
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard, faArrowAltCircleRight, faSignOutAlt, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.css';
import { Nav, Navbar, Container } from 'react-bootstrap';
import './NavBar.css';
import { Link } from 'react-router-dom';
import { useAuth, logout } from '../../firebase';
import { useState } from 'react';

const Nav_Bar = () => {
  const [loading, setLoading] = useState(false);
  const currentUser = useAuth();

  async function handleLogout() {
    setLoading(true);
    try {
      await logout();
    } catch {
      alert('Error!');
    }
    setLoading(false);
  }

  return (
    <div className="nav_Bar_Font">
      <Navbar bg="my-Blue" variant="dark">
        <Container>
          <Navbar.Brand>
            <img alt="navLogo" src="./images/icons/favicon.ico" width="30px" height="30px" className="d-inline-block align-top" />{' '}
            <b>
              Present <FontAwesomeIcon icon={faArrowAltCircleRight} /> Simple
            </b>
          </Navbar.Brand>{' '}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" bg="light">
              {/* when user is NOT connected => Show: */}
              {!currentUser && (
                <>
                  <Nav.Link as={Link} to={'/'}>
                    <FontAwesomeIcon icon={faHome} /> HOME
                  </Nav.Link>
                </>
              )}
              {/* when user is connected => Show: */}
              {currentUser && (
                <>
                  <Nav.Link as={Link} to={'/posts_Page'}>
                    <FontAwesomeIcon icon={faAddressCard} /> POSTS
                  </Nav.Link>
                  <Nav.Link as={Link} to={'/profile'}>
                    <FontAwesomeIcon icon={faUserCircle} /> PROFILE
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to={'/about'}>
                <FontAwesomeIcon icon={faInfoCircle} /> ABOUT US
              </Nav.Link>
              {/* when user is NOT connected => Show: */}
              {!currentUser && (
                <>
                  <Nav.Link as={Link} to={'/login'}>
                    <FontAwesomeIcon icon={faSignInAlt} /> LOGIN
                  </Nav.Link>{' '}
                  <Nav.Link as={Link} to={'/signup'}>
                    <FontAwesomeIcon icon={faUserPlus} /> SIGN UP
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
          {currentUser && (
            <>
              <div id="logged_User">
                <b>Logged in user:</b> {currentUser?.email}
              </div>
              <div>
                <Link to="/">
                  <button type="button" class="btn btn-outline-light" disabled={loading || !currentUser} onClick={handleLogout}>
                    {/* !currentUser - means when the user connected */}
                    {/* currentUser - means when the user disconnected */}
                    <FontAwesomeIcon icon={faSignOutAlt} />
                  </button>
                </Link>
              </div>
            </>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Nav_Bar;
