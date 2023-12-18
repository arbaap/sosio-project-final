const express = require("express");
const router = express.Router();

const Order = require("../models/order");
const Pelanggan = require("../models/pelanggan");
const Driver = require("../models/driver");

router.post("/submitorder", async (req, res) => {
  const {
    driverId,
    pelangganId,
    additionalInfo,
    titikPenjemputan,
    titikTujuan,
    pembayaran,
    spesifikPembayaran,
    harga,
  } = req.body;

  try {
    const pelanggan = await Pelanggan.findById(pelangganId);
    const driver = await Driver.findById(driverId);

    const newOrder = new Order({
      driverId,
      pelangganId,
      additionalInfo,
      titikPenjemputan,
      titikTujuan,
      pembayaran: `${pembayaran} - ${spesifikPembayaran || ""}`,
      harga,
      pelangganName: pelanggan.namaLengkap,
      driverName: driver.namaLengkap,
    });

    const savedOrder = await newOrder.save();

    await Pelanggan.findByIdAndUpdate(
      pelangganId,
      {
        $push: {
          orders: {
            orderId: savedOrder._id,
            driverName: driver.namaLengkap,
            additionalInfo: additionalInfo,
            titikPenjemputan: titikPenjemputan,
            titikTujuan: titikTujuan,
            pembayaran: pembayaran,
            harga: harga,
          },
        },
        $set: {
          lastOrder: {
            orderId: savedOrder._id,
            driverName: driver.namaLengkap,
            additionalInfo: additionalInfo,
            titikPenjemputan: titikPenjemputan,
            titikTujuan: titikTujuan,
            pembayaran: pembayaran,
            harga: harga,
          },
        },
      },
      { new: true }
    );

    driver.orders.push({
      orderId: savedOrder._id,
      pelangganName: pelanggan.namaLengkap,
      additionalInfo: additionalInfo,
      titikPenjemputan: titikPenjemputan,
      titikTujuan: titikTujuan,
      pembayaran: pembayaran,
      harga: harga,
    });

    await pelanggan.save();
    await driver.save();

    res.json(savedOrder);
  } catch (error) {
    res.status(400).json({ error: "Failed to submit order" });
  }
});

router.get("/orders/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  try {
    const orders = await Order.find({ driverId: driverId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/ordersfordriver/:driverId", async (req, res) => {
  const driverId = req.params.driverId;

  try {
    const orders = await Order.find({ driverId: driverId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.get("/historyorder/:pelangganId", async (req, res) => {
  const pelangganId = req.params.pelangganId;

  try {
    const orders = await Order.find({ pelangganId: pelangganId });

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

router.post("/approveOrder", async (req, res) => {
  const { orderId, pelangganId } = req.body;

  try {
    const orderItem = await Order.findOne({ _id: orderId });

    orderItem.statusOrder = "Proses Order";
    await orderItem.save();

    const pelanggan = await Pelanggan.findOne({ _id: pelangganId });

    // const bookings = room.pelanggan;

    // const temp = bookings.filter(
    //   (booking) => booking.bookingid.toString() !== bookingid
    // );
    // room.pelanggan = temp;

    // await room.save();

    res.json({ orderItem, pelanggan });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/completeOrder", async (req, res) => {
  const { orderId } = req.body;

  try {
    const orderItem = await Order.findOne({ _id: orderId });

    if (!orderItem) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (orderItem.statusOrder !== "Proses Order") {
      return res
        .status(400)
        .json({ error: "Order cannot be completed in the current status" });
    }

    orderItem.statusOrder = "Selesai Order";
    await orderItem.save();

    res.json({ message: "Order completed successfully", orderItem });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to complete order" });
  }
});

router.get("/getallorders", async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

module.exports = router;
