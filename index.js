const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./modles/schema");
app.use(express.json());
app.use(cors());
const router = require("./routes/route");

// create API

app.use("/api", router);

// create database

mongoose
  .connect(
    "mongodb+srv://yousefabdallah55464:A7iEKCS5vmbw0u8S@cluster0.zomfo.mongodb.net/"
  )
  .then(() => {
    console.log("Connected to database");
    app.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch(() => {
    console.log("Failed to connect to database");
  });
