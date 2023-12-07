import React, { useState } from "react";
import axios from "axios";

import Card from "react-bootstrap/Card";
import logo from "../../assets/logo.png";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
function PelangganLogin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");

  async function Login() {
    const pelanggans = {
      username,
      password,
    };
    console.log(pelanggans);
    try {
      const result = (
        await axios.post("/api/pelanggans/loginpelanggan", pelanggans)
      ).data;
      Swal.fire("Okay", "Login Berhasil", "success").then((result) => {
        window.location.href = "/home";
      });
      sessionStorage.setItem("pelanggans", JSON.stringify(result));
    } catch (error) {
      Swal.fire("oops", "something went wrong", "error");
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <div className="col">
          <Card className="cardmodal">
            <Card.Body>
              <Card.Title className="text-center">
                <img className="img-logo" src={logo} alt="" />
                <h2>Customer</h2>
                <h1>UINJEK</h1>
              </Card.Title>
              <Card.Text>
                <h2 className="judullogin">Masuk</h2>
                <input
                  type="text"
                  className="form-control"
                  placeholder="username"
                  value={username}
                  onChange={(e) => {
                    setusername(e.target.value);
                  }}
                />
                <input
                  type="text"
                  className="form-control"
                  placeholder="password"
                  value={password}
                  onChange={(e) => {
                    setpassword(e.target.value);
                  }}
                />
                <Button className="btnlogin btn btn-block" onClick={Login}>
                  Masuk
                </Button>
                <p className="mt-3 text-center" style={{ fontSize: 8 }}>
                  Login Sebagai Driver?{" "}
                  <a href="/logindriver" className="register-link">
                    Login
                  </a>
                </p>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PelangganLogin;
