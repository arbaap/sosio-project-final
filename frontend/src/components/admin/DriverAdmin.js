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
        window.location.href = "/logindriver";
      });

      return;
    }

    setShowAdminContent(true);
  }, []);

  return (
    <div className="tampilanadmin m-3">
      {showAdminContent && (
        <Tab.Container id="left-tabs-example" defaultActiveKey="datadrivers">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <h2>
                  <b>Driver Report</b>
                </h2>

                <Nav.Item>
                  {/* <Nav.Link eventKey="drivers">Drivers</Nav.Link> */}
                  <Nav.Link eventKey="datadrivers">Data Driver</Nav.Link>
                  <Nav.Link eventKey="completeorder">Complete Order</Nav.Link>
                  <Nav.Link eventKey="prosesorder">Proses Order</Nav.Link>
                  <Nav.Link eventKey="incoming">Incoming Orders</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="datadrivers">
                  <DataDrivers />
                </Tab.Pane>
                <Tab.Pane eventKey="completeorder">
                  <OrdersComplete />
                </Tab.Pane>
                <Tab.Pane eventKey="prosesorder">
                  <OrdersHistory />
                </Tab.Pane>
                <Tab.Pane eventKey="incoming">
                  <IncomingOrders />
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

export function IncomingOrders() {
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

  const handleApproveOrder = async (orderId, pelangganId) => {
    const confirmResult = await Swal.fire({
      title: "Yakin ingin menerima order?",
      text: "Setelah diterima, order tidak dapat dibatalkan.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Terima",
      cancelButtonText: "Tidak",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.post("/api/orders/approveOrder", {
          orderId,
          pelangganId,
        });

        fetchOrders();

        Swal.fire({
          title: "Order Approved",
          text: "Order has been approved successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        console.log(fetchOrders());
        console.log(response.data);
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error",
          text: "Failed to approve order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
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
            <th>Status Order</th>
            <th>Terima Order</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => order.statusOrder === "Pending")
            .map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.pelangganName}</td>
                <td>{order.additionalInfo}</td>
                <td>{order.statusOrder}</td>
                <td className="col-1">
                  <button
                    className="terimakeluhan btn-success"
                    onClick={() =>
                      handleApproveOrder(order._id, order.pelangganId)
                    }
                  >
                    Terima
                  </button>
                  <button className="tolakkeluhan btn-danger">Tolak</button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export function OrdersHistory() {
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

  // const handleApproveOrder = async (orderId, pelangganId) => {
  //   const confirmResult = await Swal.fire({
  //     title: "Yakin ingin menerima order?",
  //     text: "Setelah diterima, order tidak dapat dibatalkan.",
  //     icon: "question",
  //     showCancelButton: true,
  //     confirmButtonText: "Ya, Terima",
  //     cancelButtonText: "Tidak",
  //   });

  //   if (confirmResult.isConfirmed) {
  //     try {
  //       const response = await axios.post("/api/orders/approveOrder", {
  //         orderId,
  //         pelangganId,
  //       });

  //       fetchOrders();

  //       Swal.fire({
  //         title: "Order Approved",
  //         text: "Order has been approved successfully.",
  //         icon: "success",
  //         confirmButtonText: "OK",
  //       });

  //       console.log(fetchOrders());
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error(error);

  //       Swal.fire({
  //         title: "Error",
  //         text: "Failed to approve order. Please try again.",
  //         icon: "error",
  //         confirmButtonText: "OK",
  //       });
  //     }
  //   }
  // };

  const handleCompleteOrder = async (orderId) => {
    const confirmResult = await Swal.fire({
      title: "Yakin ingin menyelesaikan order?",
      text: "Setelah diselesaikan, order akan berubah status menjadi 'Selesai Order'.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Ya, Selesaikan",
      cancelButtonText: "Tidak",
    });

    if (confirmResult.isConfirmed) {
      try {
        const response = await axios.post("/api/orders/completeOrder", {
          orderId,
        });

        fetchOrders();

        Swal.fire({
          title: "Order Completed",
          text: "Order has been completed successfully.",
          icon: "success",
          confirmButtonText: "OK",
        });

        console.log(fetchOrders());
        console.log(response.data);
      } catch (error) {
        console.error(error);

        Swal.fire({
          title: "Error",
          text: "Failed to complete order. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    }
  };

  return (
    <Container>
      <h2>
        <b>Proses Order</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pelanggan</th>
            <th>Additional Info</th>
            <th>Status Order</th>
            <th>Terima Order</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => order.statusOrder === "Proses Order")
            .map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.pelangganName}</td>
                <td>{order.additionalInfo}</td>
                <td>{order.statusOrder}</td>
                <td className="col-1">
                  <button
                    className="terimakeluhan btn-success"
                    onClick={() =>
                      handleCompleteOrder(order._id, order.pelangganId)
                    }
                  >
                    Selesai Order
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export function OrdersComplete() {
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
        <b>Complete Order</b>
      </h2>
      <Table responsive>
        <thead>
          <tr>
            <th>No</th>
            <th>Nama Pelanggan</th>
            <th>Additional Info</th>
            <th>Status Order</th>
          </tr>
        </thead>
        <tbody>
          {orders
            .filter((order) => order.statusOrder === "Selesai Order")
            .map((order, index) => (
              <tr key={order._id}>
                <td>{index + 1}</td>
                <td>{order.pelangganName}</td>
                <td>{order.additionalInfo}</td>
                <td>{order.statusOrder}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}
