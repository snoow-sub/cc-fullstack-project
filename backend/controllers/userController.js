const userModel = require("../models/userModel");

exports.addUser = async (req, res) => {
  try {
    if (!req.body || !req.body.name) {
      return res.status(500).json({ error: "Name is required" });
    }
    const user_id = await userModel.addUser(req.body);
    res.status(201).json({ user_id });
  } catch (err) {
    res.status(500).json({ error: "Failed to add User" });
    console.error(err);
  }
};
