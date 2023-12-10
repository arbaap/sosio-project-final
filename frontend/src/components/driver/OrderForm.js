import React, { useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import Swal from "sweetalert2";

const OrderForm = ({
  selectedDriver,
  pelangganName,
  pelangganId,
  onOrderSubmit,
}) => {
  const [additionalInfo, setAdditionalInfo] = useState("");
const [loading, setLoading] = useState(false);
  const handleOrderSubmit = async () => {
    try {
      setLoading(true);
      const response = await axios.post("api/orders/submitorder", {
        driverId: selectedDriver._id,
        pelangganName,
        pelangganId,
        additionalInfo,
      });

      onOrderSubmit(response.data);

      Swal.fire({
        icon: "info",
        title: "Order Berhasil",
        text: "Orderan Anda akan segera di proses",
      });

      setAdditionalInfo("");
    } catch (error) {
      console.error("Error submitting order:", error);

      Swal.fire({
        icon: "error",
        title: "Order Gagal",
        text: "Terjadi kesalahan saat mengirim pesanan. Silakan coba lagi.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form>
      <Form.Group controlId="additionalInfo">
        <Form.Label>Additional Information</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={additionalInfo}
          onChange={(e) => setAdditionalInfo(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" onClick={handleOrderSubmit} disabled={loading}>
        {loading ? (
          <>
            <Spinner animation="border" size="sm" className="me-2" />
            Loading...
          </>
        ) : (
          "Order Driver"
        )}
      </Button>
    </Form>
  );
};

export default OrderForm;
