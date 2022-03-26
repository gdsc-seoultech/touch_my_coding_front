import React from "react";
import styled from "styled-components";
import { useLocation, Link } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";

const HeadWrapper = styled.div`
  a {
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    margin-right: 25px;
    padding: 5px 0px;
  }
  .active-nav {
    color: white !important;
  }
`;

const Header = () => {
  const location = useLocation();
  const mainLocation = location.pathname.split("/")[1];

  return (
    <HeadWrapper>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Nav className="me-auto">
            <Link to="/" className={mainLocation ? "" : "active-nav"}>
              Touch my coding
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </HeadWrapper>
  );
};

export default Header;
