const User = require("../modles/schema");

const generateBranchId = async () => {
  const count = await User.countDocuments();
  return `USR${String(count + 1).padStart(3, "0")}`;
};

const createCustomer = async (req, res) => {
  try {
    const allData = req.body;

    const branch_id = await generateBranchId();

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
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({});
    res.json(customers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCustomers = async (req, res) => {
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
};

module.exports = { createCustomer, getCustomers, updateCustomers };
