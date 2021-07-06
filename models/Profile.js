const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  full_name: {
    type: String,
    require: true,
  },
  account_type: {
    type: String,
    require: true,
  },
  profile_type: {
    type: String,
    require: true,
  },
  full_name: {
    type: String,
    require: true,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  artist_name: {
    type: String,
    require: true,
  },
  pricing_plan: {
    type: String,
    require: true,
  },
  referance: {
    type: String,
    require: true,
  },
  reg_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = profile = mongoose.model("profile", ProfileSchema);
