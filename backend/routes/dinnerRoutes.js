const express = require('express')
const router = express.Router()
const dinnerController = require('../controllers/dinnerController')

// 自炊の予定(cooking)
router.post('/addCook', dinnerController.addCooking)
router.post('/deleteCook', dinnerController.deleteCooking)

// 飲み会の予定(drinking)
router.post('/addDrink', dinnerController.addDrinking)
router.post('/deleteDrink', dinnerController.deleteDrinking)

module.exports = router