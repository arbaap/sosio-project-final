import axios from "axios";
import React, { useEffect, useState } from "react";
import { Tab, Col, Nav, Row, Table, Container, Card } from "react-bootstrap";
import Swal from "sweetalert2";

function DriverAdmin() {
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const drivers = JSON.parse(sessionStorage.getItem("drivers"));
    if (!drivers || !drivers.isDriver) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Akun Anda Belum Terverifikasi. Anda tidak memiliki izin untuk mengakses halaman ini.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/loginadmin";
      });

      return;
    }

    setShowAdminContent(true);
  }, []);

  return (
    <div className="tampilanadmin m-3">
      {showAdminContent && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="drivers">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>Driver Report</b>
                </h2>

                <Nav.Item>
                  <Nav.Link eventKey="drivers">Drivers</Nav.Link>
                  <Nav.Link eventKey="datadrivers">Data Driver</Nav.Link>
                  <Nav.Link eventKey="pelanggan">Pelanggan</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="drivers">
                  <Drivers />
                </Tab.Pane>
                <Tab.Pane eventKey="datadrivers">
                  <DataDrivers />
                </Tab.Pane>
                <Tab.Pane eventKey="pelanggan">
                  <Orders />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
}

export default DriverAdmin;

export function DataDrivers() {
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
export function Drivers() {
  const [drivers, setdrivers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(5);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/drivers/getalldrivers");
      setdrivers(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastKeluhan = currentPage * perPage;
  const indexOfFirstKeluhan = indexOfLastKeluhan - perPage;
  const currentKeluhans = drivers.slice(
    indexOfFirstKeluhan,
    indexOfLastKeluhan
  );

  // async function selesaiKeluhan(keluhanid) {
  //   try {
  //     const result = await (
  //       await axios.post("/api/keluhans/selesaikeluhan", {
  //         keluhanid,
  //       })
  //     ).data;
  //     console.log(result);
  //     Swal.fire("Okay", "Keluhan Selesai", "success").then((result) => {
  //       window.location.reload();
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     Swal.fire("Oops", "Something went wrong", "error");
  //   }
  // }

  return (
    <Container>
      <h2>
        <b>Daftar Driver</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Lengkap</th>
            <th>NIM / KTP</th>
            <th>Email</th>
            <th>No Telepon</th>
            <th>Alamat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {currentKeluhans.map((drivers, index) => {
            let statusClass = "";
            switch (drivers.status) {
              case "Pending":
                return null;
              case "Diproses":
                statusClass = "status-diterima";
                break;
              case "Ditolak":
                statusClass = "status-ditolak";
                break;
              case "Selesai":
                statusClass = "status-selesai";
                break;
              default:
                break;
            }
            return (
              <tr key={drivers._id}>
                <td>{index + indexOfFirstKeluhan + 1}</td>
                <td>{drivers.namaLengkap}</td>
                <td>
                  {drivers.noNIM} / {drivers.noKTP}
                </td>
                <td>{drivers.email}</td>
                <td>{drivers.noTelepon}</td>
                <td>{drivers.alamat}</td>

                <td className="col-1">
                  <button
                    className="terimakeluhan btn-success"
                    // onClick={() => selesaiKeluhan(keluhan._id)}
                  >
                    Selesai
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination
        currentPage={currentPage}
        perPage={perPage}
        totalKeluhans={drivers.length}
        onPageChange={handlePageChange}
      />
    </Container>
  );

  function Pagination({ currentPage, perPage, totalDrivers, onPageChange }) {
    const pageNumbers = Math.ceil(totalDrivers / perPage);

    return (
      <nav>
        <ul className="pagination">
          {Array.from({ length: pageNumbers }, (_, i) => i + 1).map(
            (pageNumber) => (
              <li
                key={pageNumber}
                className={`page-item${
                  currentPage === pageNumber ? " active" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => onPageChange(pageNumber)}
                >
                  {pageNumber}
                </button>
              </li>
            )
          )}
        </ul>
      </nav>
    );
  }
}

export function Orders() {
  const [orders, setOrders] = useState([]);
  const drivers = JSON.parse(sessionStorage.getItem("drivers"));
  const driverId = drivers ? drivers._id : null;

  useEffect(() => {
    if (driverId) {
      fetchOrders();
    }
  }, [driverId]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(
        `/api/orders/ordersfordriver/${driverId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <h2>
        <b>Daftar Pesanan</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pelanggan</th>
            <th>Additional Info</th>
            {/* Tambahkan field lainnya yang ingin ditampilkan */}
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.pelangganName}</td>
              <td>{order.additionalInfo}</td>
              {/* Tambahkan field lainnya yang ingin ditampilkan */}
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
