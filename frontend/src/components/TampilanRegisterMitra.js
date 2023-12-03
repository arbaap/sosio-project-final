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
  const [allProvinces, setAllProvinces] = useState([]);

  const [allCities, setAllCities] = useState([]);
  const [allKecamatan, setAllKecamatan] = useState([]);

  const [selectedKecamatan, setSelectedKecamatan] = useState("");

  const apiUrl = "https://api.binderbyte.com";
  const apiKey =
    "1e497e09cea285d56ce02eb5ce9497b55de71665ad570a6d6ddbe5daa9927324";

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
      !provinsi ||
      !kabupatenKota ||
      !selectedKecamatan ||
      !alamat
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

    const getNamaById = (id, dataArray) => {
      const selectedData = dataArray.find((data) => data.id === id);
      return selectedData ? selectedData.name : "";
    };

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
      provinsi: getNamaById(provinsi, allProvinces),
      kabupatenKota: getNamaById(kabupatenKota, allCities),
      kecamatanDesa: getNamaById(selectedKecamatan, allKecamatan),
      alamat,
    };

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
    async function fetchProvinces() {
      try {
        const response = await axios.get(
          `${apiUrl}/wilayah/provinsi?api_key=${apiKey}`
        );
        setAllProvinces(response.data.value);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    }

    fetchProvinces();
  }, []);

  const handleProvinsiChange = async (selectedProvinsi) => {
    setProvinsi(selectedProvinsi);
    console.log("Provinsi dipilih:", selectedProvinsi);

    const provinsi = allProvinces.find((p) => p.id === selectedProvinsi);
    if (provinsi) {
      console.log("Provinsi Name:", provinsi.name);
    }

    try {
      const responseCities = await axios.get(
        `${apiUrl}/wilayah/kabupaten?api_key=${apiKey}&id_provinsi=${selectedProvinsi}`
      );
      setAllCities(responseCities.data.value);

      setKabupatenKota("");
      setAllKecamatan([]);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleKabupatenChange = async (selectedKabupaten) => {
    setKabupatenKota(selectedKabupaten);
    console.log("Kabupaten/Kota dipilih:", selectedKabupaten);

    const kabupaten = allCities.find((c) => c.id === selectedKabupaten);
    if (kabupaten) {
      console.log("Kabupaten/Kota Name:", kabupaten.name);
    }

    try {
      const responseKecamatan = await axios.get(
        `${apiUrl}/wilayah/kecamatan?api_key=${apiKey}&id_kabupaten=${selectedKabupaten}`
      );
      setAllKecamatan(responseKecamatan.data.value);
    } catch (error) {
      console.error("Error fetching kecamatan:", error);
    }
  };

  const handleKecamatanChange = (selectedKecamatan) => {
    setSelectedKecamatan(selectedKecamatan);
    console.log("Kecamatan dipilih:", selectedKecamatan);
    const kecamatan = allKecamatan.find((k) => k.id === selectedKecamatan);
    if (kecamatan) {
      console.log("Kecamatan Name:", kecamatan.name);
    }
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
                    onChange={(e) => handleProvinsiChange(e.target.value)}
                  >
                    <option value="">Pilih Provinsi</option>
                    {allProvinces.map((province) => (
                      <option key={province.id} value={province.id}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formkabupaten">
                  <Form.Control
                    as="select"
                    placeholder="Kabupaten/Kota"
                    value={kabupatenKota}
                    onChange={(e) => handleKabupatenChange(e.target.value)}
                  >
                    <option value="">Pilih Kabupaten/Kota</option>
                    {allCities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formkecamatan">
                  <Form.Control
                    as="select"
                    placeholder="Kecamatan"
                    value={selectedKecamatan}
                    onChange={(e) => handleKecamatanChange(e.target.value)}
                  >
                    <option value="">Pilih Kecamatan</option>
                    {allKecamatan.map((kecamatan) => (
                      <option key={kecamatan.id} value={kecamatan.id}>
                        {kecamatan.name}
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
