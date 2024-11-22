const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const lessonController = require("../controllers/lessonController");

router.post("/", userController.addUser);
router.get("/:id/lesson", lessonController.getLessons);

module.exports = router;
