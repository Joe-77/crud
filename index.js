const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./modles/schema");
app.use(express.json());
app.use(cors());

// create database
mongoose
  .connect(
    "mongodb+srv://yousefabdallah55464:A7iEKCS5vmbw0u8S@cluster0.zomfo.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(8000, () => {
      console.log("Server is running on port 8000");
    });
  })
  .catch(() => {
    console.log("Failed to connect to database");
  });

// create API

const generateBrunchId = async () => {
  const count = await User.countDocuments();
  return `USR${String(count + 1).padStart(3, "0")}`;
};

app.post("/create-customer", async (req, res) => {
  try {
    const allData = req.body;

    const branch_id = await generateBrunchId();

    const newUser = new User({
      branch_id: branch_id,
      customer_number: allData.customer_number,
      arabic_name: allData.arabic_name,
      arabic_description: allData.arabic_description,
      english_name: allData.english_name,
      english_description: allData.english_description,
      note: allData.note,
      address: allData.address,
    });

    await newUser.save();
    res.status(201).json({ message: "Customer created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/get-customers", async (req, res) => {
  try {
    const customers = await User.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/get-customer/:id", async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);
    if (!customer) return res.status(404).json({ message: "Customer not found" });
    res.json(customer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

app.put("/update-customer/:id", async (req, res) => {
  try {
    const updatedCustomer = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCustomer)
      return res.status(404).json({ message: "Customer not found" });
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete("/delete-customer/:id", async (req, res) => {
  try {
    const deletedCustomer = await User.findByIdAndDelete(req.params.id);
    if (!deletedCustomer)
      return res.status(404).json({ message: "Customer not found" });
    res.json({ message: "Customer deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
