const dinnerModel = require('../models/dishModel')

// 夕食情報の全てを取得
exports.getAllDiners = async (req, res) => {
  try {
    const dinner = await dinnerModel.findAll()
    res.status(200).json(dinner)
  } catch (err) {
    res.status(500).json({ error: 'Failed to get dinner' })
    console.error(err)
  }
}