import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Form, Button } from "react-bootstrap";

function TampilanRegisterMitra() {
  const [username, setUsername] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [noNIM, setNoNim] = useState("");
  const [noKTP, setNoKTP] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [tempatLahir, setTempatLahir] = useState("");
  const [tanggalLahir, setTanggalLahir] = useState("");
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupatenKota, setKabupatenKota] = useState("");
  const [kecamatanDesa, setKecamatanDesa] = useState("");
  const [allProvinces, setAllProvinces] = useState([]);
  const [citiesByProvince, setCitiesByProvince] = useState([]);
  const [allKecamatanDesa, setAllKecamatanDesa] = useState([]);

  async function daftarMitra() {
    if (
      !username ||
      !namaLengkap ||
      !noNIM ||
      !noKTP ||
      !email ||
      !noTelepon ||
      !password ||
      !cpassword ||
      !tempatLahir ||
      !tanggalLahir ||
      !alamat ||
      !provinsi ||
      !kabupatenKota
    ) {
      Swal.fire(
        "Peringatan",
        "Harap isi semua kolom yang diperlukan",
        "warning"
      );
      return;
    }

    if (password !== cpassword) {
      Swal.fire("Peringatan", "Kata sandi tidak cocok", "warning");
      return;
    }

    const driver = {
      username,
      namaLengkap,
      noNIM,
      noKTP,
      email,
      noTelepon,
      password,
      cpassword,
      tempatLahir,
      tanggalLahir,
      alamat,
      provinsi,
      kabupatenKota,
    };

    // yang kesimpan di database masih id dari provinsi sama kabupaten kota

    try {
      const result = await axios.post("/api/drivers/registermitra", driver);
      console.log(result);
      Swal.fire("Selamat", "Registrasi Berhasil", "success").then((result) => {
        window.location.href = "/logindriver";
      });
    } catch (error) {
      Swal.fire("Oops", "Terjadi kesalahan", "error");
      console.error("Kesalahan registrasi:", error);
    }
  }

  useEffect(() => {
    fetchProvinces();
  }, []);

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(
        "https://dev.farizdotid.com/api/daerahindonesia/provinsi"
      );
      setAllProvinces(response.data.provinsi);
    } catch (error) {
      console.error("Error fetching provinces:", error);
    }
  };

  const fetchCitiesByProvince = async (provinceId) => {
    try {
      const response = await axios.get(
        `https://dev.farizdotid.com/api/daerahindonesia/kota?id_provinsi=${provinceId}`
      );
      setCitiesByProvince(response.data.kota_kabupaten);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleProvinceChange = (event) => {
    const selectedProvinceId = event.target.value;
    console.log("Selected Province ID:", selectedProvinceId);
    setProvinsi(selectedProvinceId);
    fetchCitiesByProvince(selectedProvinceId);
  };

  return (
    <div className="inic container">
      <div className="tampilanhome">
        <div className="row justify-content-center">
          <div className="col-md-5 mt-5">
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
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formnamaLengkap">
                  <Form.Control
                    type="text"
                    placeholder="Nama Lengkap"
                    value={namaLengkap}
                    onChange={(e) => {
                      setNamaLengkap(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formNIM">
                  <Form.Control
                    type="text"
                    placeholder="NIM"
                    value={noNIM}
                    onChange={(e) => {
                      setNoNim(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formKTP">
                  <Form.Control
                    type="text"
                    placeholder="KTP"
                    value={noKTP}
                    onChange={(e) => {
                      setNoKTP(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formEmail">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formnoTelepon">
                  <Form.Control
                    type="number"
                    placeholder="No Telepon"
                    value={noTelepon}
                    onChange={(e) => {
                      setNoTelepon(e.target.value);
                    }}
                    pattern="[0-9]*"
                  />
                </Form.Group>

                <Form.Group controlId="formpassword">
                  <Form.Control
                    type="text"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formcpassword">
                  <Form.Control
                    type="text"
                    placeholder="Confirm Password"
                    value={cpassword}
                    onChange={(e) => {
                      setCPassword(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formtempatLahir">
                  <Form.Control
                    type="text"
                    placeholder="Tempat Lahir"
                    value={tempatLahir}
                    onChange={(e) => {
                      setTempatLahir(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formtanggalLahir">
                  <Form.Control
                    type="date"
                    placeholder="Tanggal Lahir"
                    value={tanggalLahir}
                    onChange={(e) => {
                      setTanggalLahir(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formprovinsi">
                  <Form.Control
                    as="select"
                    placeholder="Provinsi"
                    value={provinsi}
                    onChange={handleProvinceChange}
                  >
                    <option value="">Pilih Provinsi</option>
                    {allProvinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.nama}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formkabupatenKota">
                  <Form.Control
                    as="select"
                    placeholder="Kabupaten / Kota"
                    value={kabupatenKota}
                    onChange={(e) => setKabupatenKota(e.target.value)}
                  >
                    <option value="">Pilih Kabupaten / Kota</option>
                    {citiesByProvince.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.nama}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formalamat">
                  <Form.Control
                    type="text"
                    placeholder="Alamat Lengkap"
                    value={alamat}
                    onChange={(e) => {
                      setAlamat(e.target.value);
                    }}
                  />
                </Form.Group>
              </Form>
              <Button variant="primary mt-2" onClick={daftarMitra}>
                Daftar
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TampilanRegisterMitra;
