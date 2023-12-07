const express = require("express");
const router = express.Router();

const Driver = require("../models/driver");

router.post("/registermitra", async (req, res) => {
  const newDriver = new Driver({
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
    const driver = await newDriver.save();
    console.log(driver);
    res.send("Driver Register Succes");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getalldrivers", async (req, res) => {
  try {
    const drivers = await Driver.find({});
    console.log(drivers);
    res.send(drivers);
  } catch (err) {
    return res.status(400).json({ message: err });
  }
});

router.get("/getdriversbyid/:id", async (req, res) => {
  try {
    const drivers = await Driver.findById(req.params.id);
    res.json(drivers);
  } catch (error) {
    res.status(404).json({ message: err });
  }
});

router.post("/logindriv", async (req, res) => {
  const { username, password } = req.body;

  try {
    const drivers = await Driver.findOne({
      username: username,
      password: password,
    });
    if (drivers) {
      res.send(drivers);
    } else {
      return res.status(400).json({ message: "login fail" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/terimadriver", async (req, res) => {
  const { driverid } = req.body;

  try {
    const driver = await Driver.findOne({ _id: driverid });

    driver.status = "Diterima";
    driver.isDriver = true;
    await driver.save();

    res.send("Driver diterima");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/tolakdriver", async (req, res) => {
  const { driverid, alasanPenolakan } = req.body;

  try {
    const driver = await Driver.findOne({ _id: driverid });

    driver.status = "Ditolak";
    driver.alasanPenolakan = alasanPenolakan;
    await driver.save();

    res.send("Driver ditolak");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
