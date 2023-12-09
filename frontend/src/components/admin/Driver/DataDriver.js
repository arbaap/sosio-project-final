import React from "react";
import { Table, Container, Card } from "react-bootstrap";

function DataDrivers() {
  const drivers = JSON.parse(sessionStorage.getItem("drivers"));

  return (
    <Container>
      <h2>
        <b>Data Driver</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>Nama Lengkap</th>
            <th>NIM / KTP</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Alamat</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {drivers ? (
            <>
              <tr>
                <td>{drivers.namaLengkap}</td>
                <td>
                  {drivers.noNIM} / {drivers.noKTP}
                </td>
                <td>{drivers.email}</td>
                <td>{drivers.noTelepon}</td>
                <td>{drivers.alamat}</td>
                <td>
                  {drivers.imageProfile && (
                    <img
                      src={`data:image/jpeg;base64,${drivers.imageProfile}`}
                      alt="Gambar Profil"
                      style={{ maxWidth: "100px" }} // Sesuaikan ukuran gambar
                    />
                  )}
                </td>
              </tr>
            </>
          ) : (
            <>
              <h1>tidak ada data</h1>
            </>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default DataDrivers;
