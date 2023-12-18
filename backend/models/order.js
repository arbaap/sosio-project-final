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
    titikPenjemputan: {
      type: String,
    },
    titikTujuan: {
      type: String,
    },
    pembayaran: {
      type: String,
    },
    spesifikPembayaran: {
      type: String,
      required: function () {
        return (
          this.pembayaran === "m-banking" || this.pembayaran === "e-wallet"
        );
      },
    },
    harga: {
      type: String,
    },
    statusOrder: {
      type: String,
      rqeuired: true,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order", orderSchema);

module.exports = OrderModel;
