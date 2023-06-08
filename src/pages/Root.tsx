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
        <Nav.Link as={NavLink} to="promo">Promo-codes</Nav.Link>
        <Nav.Link as={NavLink} to="broadcast">Broadcast</Nav.Link> {/* Розсилки  */}
        <Nav.Link as={NavLink} to="users">Users</Nav.Link> {/* Змінити баланс юзера (демо, реальний, промо, реферальний, лотерейний), Заблокувати юзера,  Задати кастомний реферальний рівень юзера  */}
        <Nav.Link as={NavLink} to="settings">Settings</Nav.Link>
        <Nav.Link as={NavLink} to="stats">Stats</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
}
