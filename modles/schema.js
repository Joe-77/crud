const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  branch_id: String,
  customer_number: String,
  arabic_name: String,
  arabic_description: String,
  english_name: String,
  english_description: String,
  note: String,
  address: String,
});

const User = mongoose.model("users", userSchema);

module.exports = User;
