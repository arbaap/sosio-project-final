const mongoose = require("mongoose");

const driverSchema = mongoose.Schema(
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
    kecamatanDesa: {
      type: String,
    },
    imageProfile: {
      type: String,
    },
    status: {
      type: String,
      required: true,
      default: "Pending",
    },
    alasanPenolakan: {
      type: String,
    },
    isDriver: {
      type: Boolean,
      default: false,
    },
    orders: [
      {
        orderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "order",
        },
        pelangganName: String,
        additionalInfo: String,
      },
    ],
    motorcycles: [
      {
        merk: {
          type: String,
          required: true,
        },
        tahun: {
          type: Number,
          required: true,
        },
        platNomor: {
          type: String,
          required: true,
        },
        warna: {
          type: String,
          required: true,
        },
        imageMotorcycle: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const DriverModel = mongoose.model("driver", driverSchema);

module.exports = DriverModel;
