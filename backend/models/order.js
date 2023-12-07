const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    driverId: {
      type: String,
      ref: "driver",
      required: true,
    },
    driverName: {
      type: String,
      ref: "driver",
      required: true,
    },
    pelangganId: {
      type: String,
      ref: "pelanggan",
      required: true,
    },
    pelangganName: {
      type: String,
      ref: "pelanggan",
      required: true,
    },
    additionalInfo: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;