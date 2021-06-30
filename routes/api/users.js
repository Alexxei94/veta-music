const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const router = express.Router();

// User modal
const User = require("../../models/User.js");

// @route GET api/users
// @Desc register new user
// @access public
router.post("/", (req, res) => {
  const { name, email, password, country } = req.body;

  // Validations
  if (!name || !email || !password || !country) {
    res.status(400).json({ msg: "Please enter all fields" });
  }

  // Existing check
  User.findOne({ email }).then((user) => {
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const newUser = new User({
      name,
      email,
      password,
      country,
    });

    // Create salt and hash
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;

        newUser.save().then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;

              res.json({
                token,
                user: {
                  id: user.id,
                  name: user.name,
                  email: user.email,
                  country: user.country,
                },
              });
            }
          );
        });
      });
    });
  });
});

module.exports = router;
