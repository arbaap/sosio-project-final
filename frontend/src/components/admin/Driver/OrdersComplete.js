import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table, Container } from "react-bootstrap";
import { getStatusClass } from "../../utilities/statusClass";

function OrdersComplete() {
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
                <td className={getStatusClass(order.statusOrder)}>
                  {order.statusOrder}
                </td>
              </tr>
            ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default OrdersComplete;
