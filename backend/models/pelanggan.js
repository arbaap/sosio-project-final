const mongoose = require("mongoose");

const pelangganSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    namaLengkap: {
      type: String,
      required: true,
    },
    noNIM: {
      type: String,
      required: true,
    },
    noKTP: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    noTelepon: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    tempatLahir: {
      type: String,
      required: true,
    },
    tanggalLahir: {
      type: Date,
      required: true,
    },
    alamat: {
      type: String,
      required: true,
    },
    provinsi: {
      type: String,
      required: true,
    },
    kabupatenKota: {
      type: String,
    },
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
        driverName: String,
        additionalInfo: String,
      },
    ],
    lastOrder: {
      orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "order",
      },
      driverName: String,
      additionalInfo: String,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    alasanPenolakan: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const PelangganModel = mongoose.model("pelanggan", pelangganSchema);

module.exports = PelangganModel;
