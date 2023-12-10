const mongoose = require("mongoose");

const testSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    namaLengkap: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true, // Menyimpan gambar dalam bentuk Buffer
    },
  },
  {
    timestamps: true,
  }
);

const TestModel = mongoose.model("test", testSchema);

module.exports = TestModel;
