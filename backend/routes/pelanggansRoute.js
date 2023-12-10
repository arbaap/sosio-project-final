const express = require("express");
const router = express.Router();

const Pelanggan = require("../models/pelanggan");
const Order = require("../models/order");

router.post("/registerpelanggan", async (req, res) => {
  const newPelanggan = new Pelanggan({
    username: req.body.username,
    namaLengkap: req.body.namaLengkap,
    noNIM: req.body.noNIM,
    noKTP: req.body.noKTP,
    email: req.body.email,
    noTelepon: req.body.noTelepon,
    password: req.body.password,
    tempatLahir: req.body.tempatLahir,
    tanggalLahir: req.body.tanggalLahir,
    provinsi: req.body.provinsi,
    kabupatenKota: req.body.kabupatenKota,
    kecamatanDesa: req.body.kecamatanDesa,
    alamat: req.body.alamat,
  });
  try {
    const pelanggans = await newPelanggan.save();
    console.log(pelanggans);
    res.send("Pelanggan Register Succes");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallpelanggans", async (req, res) => {
  try {
    const pelanggans = await Pelanggan.find({});
    console.log(pelanggans);
    res.send(pelanggans);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.get("/getpelanggansbyid/:id", async (req, res) => {
  try {
    const pelanggans = await Pelanggan.findById(req.params.id);
    res.json(pelanggans);
  } catch (error) {
    res.status(404).json({ message: err });
  }
});

router.post("/loginpelanggan", async (req, res) => {
  const { email, password } = req.body;

  try {
    const pelanggan = await Pelanggan.findOne({ email: email });

    if (pelanggan) {
      if (pelanggan.password === password) {
        res.send(pelanggan);
      } else {
        return res.status(400).json({ message: "Password is incorrect" });
      }
    } else {
      return res.status(400).json({ message: "Email not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/terimapelanggan", async (req, res) => {
  const { pelangganid } = req.body;

  try {
    const pelanggan = await Pelanggan.findOne({ _id: pelangganid });

    pelanggan.status = "Diterima";
    pelanggan.isPelanggan = true;
    await pelanggan.save();

    res.send("pelanggan diterima");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/tolakpelanggan", async (req, res) => {
  const { pelangganid, alasanPenolakan } = req.body;

  try {
    const pelanggan = await Pelanggan.findOne({ _id: pelangganid });

    pelanggan.status = "Ditolak";
    pelanggan.alasanPenolakan = alasanPenolakan;
    await pelanggan.save();

    res.send("Driver ditolak");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

// router.get("/getordersforpelanggan/:pelangganId", async (req, res) => {
//   const pelangganId = req.params.pelangganId;
//   try {
//     const orders = await Order.find({ pelangganId });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch orders for pelanggan" });
//   }
// });

module.exports = router;
