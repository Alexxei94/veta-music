const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const Profile = require("../../models/Profile.js");

router.get("/:email", (req, res) => {
  Profile.findOne({ email: req.params.email })
    .then((profile) => res.json(profile))
    .catch((err) => res.status(404).json({ success: false }));
});

router.post("/", auth, (req, res) => {
  const {
    email,
    fullName,
    accountType,
    profileType,
    phoneNumber,
    cityName,
    artistName,
    pricingPlan,
    referance,
  } = req.body;

  Profile.findOne({ email }).then((profile) => {
    if (profile) {
      return res.status(400).json({ msg: "Profile already exists" });
    }

    const newProfile = new Profile({
      email: email,
      full_name: fullName,
      account_type: accountType,
      profile_type: profileType,
      phone: phoneNumber,
      city: cityName,
      artist_name: artistName,
      pricing_plan: pricingPlan,
      referance: referance,
    });

    newProfile.save().then((profile) => res.json(profile));
  });
});

module.exports = router;
