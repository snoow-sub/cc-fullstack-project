const express = require('express')
const router = express.Router()
const knex = require('../knexConfig');
const dinnerController = require('../controllers/dinnerController')

//router.get('/', dinnerController.getAllTodos)
router.get('/', async (req, res, next) => {
  try {
    const todos = await knex('daily').select('*')
    res.status(200).json(todos)
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.json(req.body);
  } catch (error) {
    console.error(error);
  }
})

module.exports = router