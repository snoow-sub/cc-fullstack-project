const express = require("express");
const router = express.Router();
const questionController = require("../controllers/questionController");

//【大西メモ】questionのルーティング
router.get("/", questionController.getQuestion);

module.exports = router;
