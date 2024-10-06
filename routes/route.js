const express = require("express");
const {
  createCustomer,
  getCustomers,
  updateCustomers,
} = require("../controllers/controllers");
const router = express.Router();

router.post("/create-customer", createCustomer);
router.get("/get-customers", getCustomers);
router.put("/update-customer/:id", updateCustomers);
module.exports = router;
