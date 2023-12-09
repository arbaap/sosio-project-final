const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.post("/register", async (req, res) => {
  const newAdmin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const admin = await newAdmin.save();
    console.log(admin);
    res.send("Admin Register Sucesfuly");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email: email });

    if (admin) {
      if (admin.password === password) {
        res.send(admin);
      } else {
        return res.status(400).json({ message: "Wrong Password" });
      }
    } else {
      return res.status(400).json({ message: "Email not found" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

router.get("/getallAdmins", async (req, res) => {
  try {
    const admins = await Admin.find();
    res.send(admins);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
