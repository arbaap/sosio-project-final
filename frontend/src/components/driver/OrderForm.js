import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

const OrderForm = ({
  selectedDriver,
  pelangganName,
  pelangganId,
  onOrderSubmit,
}) => {
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleOrderSubmit = async () => {
    try {
      const response = await axios.post("api/orders/submitorder", {
        driverId: selectedDriver._id,
        pelangganName,
        pelangganId,
        additionalInfo,
      });

      onOrderSubmit(response.data);

      setAdditionalInfo("");
    } catch (error) {
      console.error("Error submitting order:", error);
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

      <Button variant="primary" onClick={handleOrderSubmit}>
        Order Driver
      </Button>
    </Form>
  );
};

export default OrderForm;
