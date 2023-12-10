const express = require("express");
const router = express.Router();
const Test = require("../models/test");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/testregister", upload.single("image"), async (req, res) => {
  try {
    const imageString = req.file.buffer.toString("base64");

    const newTest = new Test({
      username: req.body.username,
      namaLengkap: req.body.namaLengkap,
      image: imageString,
    });

    const test = await newTest.save();
    console.log(test);
    res.send("Test Register Success");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
});

router.get("/gettests", async (req, res) => {
  try {
    const tests = await Test.find({});
    res.json(tests);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
