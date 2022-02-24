import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Touch my coding</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/apply">apply</Nav.Link>
          <Nav.Link href="/result">result</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default Header;
