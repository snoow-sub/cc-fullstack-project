const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const lessonController = require("../controllers/lessonController");
//【大西メモ】userAnswerControllerを追加
const userAnswerController = require("../controllers/userAnswerController");

router.post("/", userController.addUser);
router.get("/:id/lesson", lessonController.getLessons);
//【大西メモ】user_answerを呼ばれた場合を追加
router.post("/:id/user_answer", userAnswerController.addUserAnswer);

module.exports = router;
