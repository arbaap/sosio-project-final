import React, { useEffect, useState } from "react";
import { Card, Container, Table, Spinner } from "react-bootstrap";
import axios from "axios";
import imageUrl from "../../assets/logo.png";
import OrderForm from "./OrderForm";

function ListDriver() {
  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const pelanggan = JSON.parse(sessionStorage.getItem("pelanggans"));

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get("api/drivers/getalldrivers");
      setDrivers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching drivers:", error);
      setLoading(false);
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

            <Table responsive>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Image</th>
                  <th>Nama Lengkap</th>
                  <th>Action</th>
                </tr>
              </thead>
              {loading ? (
                <tbody>
                  <tr>
                    <td colSpan="6" className="text-center">
                      <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {drivers.map((driver, index) => (
                    <tr key={driver._id}>
                      <td>{index + 1}</td>
                      <td>
                        {driver.imageProfile && (
                          <img
                            src={`data:image/jpeg;base64,${driver.imageProfile}`}
                            alt="Gambar Profil"
                            style={{ maxWidth: "100px" }}
                          />
                        )}
                      </td>
                      <td>{driver.namaLengkap}</td>

                      <td>
                        <button onClick={() => setSelectedDriver(driver)}>
                          Order
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
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
