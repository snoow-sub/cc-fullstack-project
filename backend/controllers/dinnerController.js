const dinnerModel = require('../models/dinnerModel')

// 自炊の予定(cooking)を追加
exports.addCooking = async (req, res) => {
  try {
    const dinner = await dinnerModel.addCooking(req.body)
    res.status(200).json(dinner)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add cooking' })
    console.error(err)
  }
}

// 自炊の予定(cooking)を変更
exports.deleteCooking = async (req, res) => {
  try {
    const dinner = await dinnerModel.deleteCooking(req.body)
    res.status(200).json(dinner)
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete cooking' })
    console.error(err)
  }
}

// 飲み会の予定(drinking)を追加
exports.addDrinking = async (req, res) => {
  try {
    const dinner = await dinnerModel.addDrinking(req.body)
    res.status(200).json(dinner)
  } catch (err) {
    res.status(500).json({ error: 'Failed to add drinking' })
    console.error(err)
  }
}

// 飲み会の予定(drinking)を削除
exports.deleteDrinking = async (req, res) => {
  try {
    const dinner = await dinnerModel.deleteDrinking(req.body)
    res.status(200).json(dinner)
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete drinking' })
    console.error(err)
  }
}