const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const lessonController = require("../controllers/lessonController");
//【大西メモ】userAnswerControllerを追加 ⇒【野々山メモ】userAnswerRoutes.jsに移植
// const userAnswerController = require("../controllers/userAnswerController");

router.post("/", userController.addUser);
router.get("/:id/lesson", lessonController.getUserLessons);

module.exports = router;
