const todoModel = require('../models/dinnerModel')

exports.getAllDiners = async (req, res) => {
  try {
    const dinner = await dinnerModel.findAll()
    res.status(200).json(dinner)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get dinner' })
  }
}
