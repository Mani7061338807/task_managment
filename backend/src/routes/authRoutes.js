const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const authenticateUser = require("../middlewares/user");
const router = express.Router();

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({ message: "user already exits!" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    return res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/auth-status", authenticateUser, async (req, res) => {
  const user = await User.findById({ _id: req.user.id });
  if (!user) {
    return res
      .status(401)
      .send({ message: "user not found or token not valid" });
  }
  return res.status(200).json({ name: user.name, email: user.email });
});
module.exports = router;
