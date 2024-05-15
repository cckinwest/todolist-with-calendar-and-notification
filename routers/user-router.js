const express = require("express");
const User = require("../models/User");
const router = express.Router();

const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "new user registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error!" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(401).json({ message: "invalid username or password!" });
    }

    if (user.password !== password) {
      return res.status(401).json({ message: "invalid username or password!" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.SECRET_KEY
    );

    res.setHeader('authorization', token);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error!" });
  }
});

module.exports = router;
