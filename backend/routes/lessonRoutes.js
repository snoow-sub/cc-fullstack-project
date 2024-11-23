const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");

router.get("/:id/reservations", lessonController.getLessons);
router.post("/", lessonController.addLesson);

module.exports = router;
