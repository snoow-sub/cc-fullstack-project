const express = require('express')
const router = express.Router()
const dishController = require('../controllers/dishController')

router.get('/', dishController.dishCheck)

module.exports = router