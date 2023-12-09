import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import Swal from "sweetalert2";
import { getStatusClass } from "../../utilities/statusClass";

function IncomingOrders() {
  const [orders, setOrders] = useState([]);
  const drivers = JSON.parse(sessionStorage.getItem("drivers"));
  const driverId = drivers ? drivers._id : null;

  useEffect(() => {
    if (driverId) {
      fetchOrders();
    }
  });

  useEffect(() => {
    fetchOrders();
  });

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
                <td className={getStatusClass(order.statusOrder)}>
                  {order.statusOrder}
                </td>
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

export default IncomingOrders;
