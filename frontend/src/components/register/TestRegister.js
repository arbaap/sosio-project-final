import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

function TestRegister() {
  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [image, setImage] = useState(null);

  async function daftarMitra() {
    if (!username || !namaLengkap || !image) {
      Swal.fire(
        "Peringatan",
        "Harap isi semua kolom yang diperlukan",
        "warning"
      );
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("namaLengkap", namaLengkap);
    formData.append("image", image);

    try {
      const result = await axios.post("/api/test/testregister", formData);
      console.log(result);
      Swal.fire("Selamat", "Registrasi Berhasil", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      Swal.fire("Oops", "Terjadi kesalahan", "error");
      console.error("Kesalahan registrasi:", error);
    }
  }

  const [validation, setValidation] = useState({
    username: true,
    namaLengkap: true,
  });

  return (
    <Container>
      <div className="tampilanhome">
        <Row className="justify-content-md-center">
          <Col>
            <div className="bs">
              <h2 className="text-center">Daftar UINJEK</h2>
              <Form>
                <Form.Group controlId="formUsername">
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        username: e.target.value.length > 0,
                      }));
                    }}
                  />
                  {!validation.username && (
                    <Form.Text className="text-danger">
                      Username wajib diisi
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formnamaLengkap">
                  <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    value={namaLengkap}
                    onChange={(e) => {
                      setNamaLengkap(e.target.value);
                      setValidation((prevValidation) => ({
                        ...prevValidation,
                        namaLengkap: e.target.value.length > 0,
                      }));
                    }}
                  />
                  {!validation.namaLengkap && (
                    <Form.Text className="text-danger">
                      Nama Lengkap wajib diisi
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group controlId="formImage">
                  <Form.Label>Gambar Profil</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </Form.Group>
              </Form>
              <Button variant="primary mt-2" onClick={daftarMitra}>
                Daftar
              </Button>
            </div>
          </Col>
        </Row>
        <TestList />
      </div>
    </Container>
  );
}

export default TestRegister;

export function TestList() {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Mengambil data uji saat komponen dimuat
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/test/gettests");
        setTests(response.data);
      } catch (error) {
        console.error("Error fetching test data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <div className="tampilanhome">
        <Row className="justify-content-md-center">
          <Col>
            <div className="bs">
              <h2 className="text-center">Daftar UINJEK</h2>
              {tests.map((test) => (
                <Card key={test._id} className="mb-3">
                  <Card.Body>
                    <Card.Title>{test.username}</Card.Title>
                    <Card.Text>Nama Lengkap: {test.namaLengkap}</Card.Text>
                    {test.image && (
                      <Card.Img
                        src={`data:image/jpeg;base64,${test.image}`}
                        alt="Gambar Profil"
                      />
                    )}
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
