const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();
const auth = require("../../middleware/auth");

// User modal
const User = require("../../models/User.js");

// @route GET api/auth
// @Desc authenticate user
// @access public
router.post("/", (req, res) => {
  const { email, password } = req.body;

  // Validations
  if (!email || !password) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  // Existing check
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ msg: "User does not exist" });
    }

    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }

      jwt.sign(
        { id: user.id },
        config.get("jwtSecret"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;

          res.json({
            accessToken: token,
            user: { id: user.id, name: user.name, email: user.email },
          });
        }
      );
    });
  });
});

// @route GET api/auth
// @Desc authenticate user
// @access public
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

module.exports = router;
