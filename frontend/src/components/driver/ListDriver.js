import React, { useEffect, useState } from "react";
import { Card, Container, Table } from "react-bootstrap";
import axios from "axios";
import imageUrl from "../../assets/logo.png";
import OrderForm from "./OrderForm";

function ListDriver() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const pelanggan = JSON.parse(sessionStorage.getItem("pelanggans"));

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("api/drivers/getalldrivers");
      setDrivers(response.data);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  const handleOrderSubmit = (orderInfo) => {
    console.log("Order Submitted:", orderInfo);
    setSelectedDriver(null);
  };

  

  return (
    <Container>
      <div className="tampilan home">
        <Card className="mb-3 catagory-card">
          <Card.Body>
            <Card.Title className="text-center">Daftar Driver</Card.Title>
            <Table>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Nama Lengkap</th>
                  <th>Rating</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((driver, index) => (
                  <tr key={driver._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={imageUrl}
                        alt={`Profile of ${driver.namaLengkap}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                    </td>
                    <td>{driver.namaLengkap}</td>
                    <td>*</td>
                    <td>
                      <button onClick={() => setSelectedDriver(driver)}>
                        Order
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            {selectedDriver && (
              <OrderForm
                selectedDriver={selectedDriver}
                pelangganName={pelanggan ? pelanggan.namaLengkap : ""}
                pelangganId={pelanggan ? pelanggan._id : ""}
                onOrderSubmit={handleOrderSubmit}
              />
            )}
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
}

export default ListDriver;
