const express = require("express");
const router = express.Router();

const userAnswerController = require("../controllers/userAnswerController");

router.post("/", userAnswerController.addUserAnswer);

module.exports = router;
