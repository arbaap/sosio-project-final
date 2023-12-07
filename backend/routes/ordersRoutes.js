const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Pelanggan = require("../models/pelanggan");
const Driver = require("../models/driver");

router.post("/submitorder", async (req, res) => {
  const { driverId, pelangganId, additionalInfo } = req.body;

  try {
    const pelanggan = await Pelanggan.findById(pelangganId);
    const driver = await Driver.findById(driverId);

    const newOrder = new Order({
      driverId,
      pelangganId,
      additionalInfo,
      pelangganName: pelanggan.namaLengkap,
      driverName: driver.namaLengkap,
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: "Failed to submit order" });
  }
});

router.get("/orders/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  try {
    // Cari semua pemesanan yang terkait dengan driverId
    const orders = await Order.find({ driverId: driverId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/ordersfordriver/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  try {
    // Cari semua pesanan yang terkait dengan driverId
    const orders = await Order.find({ driverId: driverId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/historyorder/:pelangganId", async (req, res) => {
  const pelangganId = req.params.pelangganId;

  try {
    // Cari semua pesanan yang terkait dengan pelangganId
    const orders = await Order.find({ pelangganId: pelangganId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
