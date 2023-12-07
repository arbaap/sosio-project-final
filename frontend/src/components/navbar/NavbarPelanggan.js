import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../assets/img/gmaps/driver.png";

const NavbarPelanggan = () => {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="/home">
          <img className="img-logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/registermitra">Daftar Mitra</Nav.Link>
            <Nav.Link href="/logindriver">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPelanggan;
