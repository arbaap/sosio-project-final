import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../assets/subang.png";
import Swal from "sweetalert2";

const NavbarPageDriver = () => {
  const drivers = JSON.parse(localStorage.getItem("drivers"));

  function logout() {
    Swal.fire({
      title: "Logout",
      text: "Apakah Anda yakin ingin keluar?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya",
      cancelButtonText: "Tidak",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("drivers");
        Swal.fire("Okay", "Logout Berhasil", "success").then(() => {
          window.location.href = "/logindriver";
        });
      }
    });
  }

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Brand href="">
          <img className="img-logo" src={logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto right">
            {drivers ? (
              <>
                <NavDropdown
                  title={
                    <span style={{ color: "white" }}>
                      {drivers.namaLengkap}
                    </span>
                  }
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item href="/logindriver" onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/registermitra">Daftar Mitra</Nav.Link>
                <Nav.Link href="/logindriver">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPageDriver;