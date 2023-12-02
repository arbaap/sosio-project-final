import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { Tab, Col, Nav, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { LinearScale } from "chart.js";

import "../index.css";

function DriverAdmin() {
  const [showAdminContent, setShowAdminContent] = useState(false);

  useEffect(() => {
    const drivers = JSON.parse(localStorage.getItem("drivers"));
    if (!drivers || !drivers.isDriver) {
      Swal.fire({
        title: "Akses Ditolak",
        text: "Akun Anda Belum Terverifikasi. Anda tidak memiliki izin untuk mengakses halaman ini.",
        icon: "warning",
        confirmButtonText: "OK",
      }).then(() => {
        window.location.href = "/login";
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
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      )}
    </div>
  );
}

export default DriverAdmin;

export function Keluhans() {
  const [keluhans, setkeluhans] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  useEffect(() => {
    (async () => {
      try {
        const data = await (
          await axios.get("/api/keluhans/getallkeluhans")
        ).data;
        setkeluhans(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  async function terimaKeluhan(keluhanid) {
    try {
      const result = await (
        await axios.post("/api/keluhans/terimakeluhan", {
          keluhanid,
        })
      ).data;
      console.log(result);
      Swal.fire("Okay", "Keluhan Diterima", "success").then((result) => {
        window.location.reload();
      });
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  async function tolakKeluhan(keluhanid) {
    try {
      const result = await Swal.fire({
        title: "Alasan Penolakan",
        input: "textarea",
        inputPlaceholder: "Masukkan alasan penolakan",
        showCancelButton: true,
        confirmButtonText: "Tolak",
        cancelButtonText: "Batal",
        showLoaderOnConfirm: true,
        preConfirm: (alasan) => {
          return axios
            .post("/api/keluhans/tolakkeluhan", {
              keluhanid,
              alasanPenolakan: alasan,
            })
            .then((response) => {
              if (response.data === "Keluhan ditolak") {
                Swal.fire(
                  "Okay",
                  "Keluhan Ditolak dengan alasan : \n " + alasan,
                  "success"
                ).then((result) => {
                  window.location.reload();
                });
              } else {
                Swal.fire("Oops", "Something went wrong", "error");
              }
            })
            .catch((error) => {
              Swal.fire("Oops", "Something went wrong", "error");
            });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });

      if (result.isDismissed) {
        return;
      }
    } catch (error) {
      console.log(error);
      Swal.fire("Oops", "Something went wrong", "error");
    }
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const filteredKeluhans = keluhans.filter(
    (keluhan) => keluhan.status === "Pending"
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredKeluhans.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  return (
    <div className="row">
      <div className="col-md-12">
        <h1>Laporan Masuk</h1>

        <table className="table table-bordered ">
          <thead className="">
            <tr>
              <th>No</th>
              <th>Nama</th>
              <th>Kategori</th>
              <th>Judul Pengaduan</th>
              <th>Isi Pengaduan</th>
              <th>Tanggal</th>
              <th>Aksi</th>
            </tr>
          </thead>

          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((keluhan, index) => (
                <tr key={keluhan._id}>
                  <td>{index + indexOfFirstItem + 1}</td>
                  <td>{keluhan.namawarga}</td>
                  <td className="col-2">{keluhan.kategori}</td>
                  <td>{keluhan.judulpengaduan}</td>
                  <td>{keluhan.isipengaduan}</td>
                  <td>
                    {new Date(keluhan.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>

                  <td className="col-1">
                    {keluhan.status !== "pending" && (
                      <button
                        className="terimakeluhan btn-success"
                        onClick={() => terimaKeluhan(keluhan._id)}
                      >
                        Terima
                      </button>
                    )}
                    {keluhan.status !== "pending" && (
                      <button
                        className="tolakkeluhan btn-danger"
                        onClick={() => tolakKeluhan(keluhan._id)}
                      >
                        Tolak
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">Tidak ada keluhan yang tersedia.</td>
              </tr>
            )}
          </tbody>
        </table>

        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredKeluhans.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );

  function Pagination({ currentPage, itemsPerPage, totalItems, onPageChange }) {
    const pageNumbers = Math.ceil(totalItems / itemsPerPage);

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
    <div className="row">
      <div className="col-md-12">
        <h1>Daftar Driver</h1>
        <table className="table table-bordered">
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
        </table>
        <Pagination
          currentPage={currentPage}
          perPage={perPage}
          totalKeluhans={drivers.length}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
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
