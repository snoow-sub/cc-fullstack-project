const userModel = require("../models/userModel");

exports.addUser = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(500).json({ error: "Body is required" });
    }
    const createdId = await userModel.addUser(req.body);
    res.status(201).json({ id: createdId });
  } catch (err) {
    res.status(500).json({ error: "Failed to add User" });
    console.error(err);
  }
};
