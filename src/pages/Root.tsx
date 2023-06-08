import {Container, Nav, Navbar} from "react-bootstrap";
import {NavLink, Outlet} from "react-router-dom";


export function Root() {

  return <>
    <MyNavbar/>
    <Container className="p-2">
      <Outlet/>
    </Container>
  </>

}

function MyNavbar() {
  return <Navbar bg="light" expand="lg">
    <Navbar.Brand as={NavLink} to="/">Casino</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="wof">Wheel of fortune</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}
