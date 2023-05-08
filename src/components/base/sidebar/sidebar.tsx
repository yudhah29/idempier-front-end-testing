import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

export const NavbarComp = () => {
    return (
        <Navbar expand="lg">

            <Container fluid>
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src="https://react-bootstrap.netlify.app/img/logo.svg"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    React Bootstrap
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="navbarScroll" />
            </Container>
        </Navbar>
    )
}

export default NavbarComp;