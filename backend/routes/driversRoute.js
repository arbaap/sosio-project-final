const express = require("express");
const router = express.Router();

const Driver = require("../models/driver");
const Order = require("../models/order");

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post(
  "/registerdriver",
  upload.single("imageProfile"),
  async (req, res) => {
    const imageString = req.file.buffer.toString("base64");

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
      imageProfile: imageString,
    });
    try {
      const driver = await newDriver.save();
      console.log(driver);
      res.send("Driver Register Succes");
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

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
  const { email, password } = req.body;

  try {
    const driver = await Driver.findOne({ email: email });

    if (driver) {
      if (driver.password === password) {
        res.send(driver);
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

// router.get("/getordersfordriver/:driverId", async (req, res) => {
//   const driverId = req.params.driverId;
//   try {
//     const orders = await Order.find({ driverId });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ error: "Failed to fetch orders for driver" });
//   }
// });

router.post(
  "/addmotor/:driverId",
  upload.single("imageMotorcycle"),
  async (req, res) => {
    const driverId = req.params.driverId;
    const { merk, tahun, platNomor, warna } = req.body;
    const imageMotorcycle = req.file.buffer.toString("base64");

    try {
      const driver = await Driver.findById(driverId);

      if (!driver) {
        return res.status(404).json({ message: "Driver not found" });
      }

      driver.motorcycles.push({
        merk,
        tahun,
        platNomor,
        warna,
        imageMotorcycle,
      });

      await driver.save();
      console.log(driver);
      res.send("Motor added successfully");
    } catch (error) {
      return res.status(400).json({ error });
    }
  }
);

module.exports = router;
