const express = require("express");
const router = express.Router();
const recommendController = require("../controllers/recommendController");

//【大西メモ】recommendのルーティング
router.post("/", recommendController.addRecommend);

module.exports = router;
