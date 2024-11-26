const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const reservationController = require("../controllers/reservationController");

router.get("/:id/reservations", reservationController.getReservedLessons);
router.get("/popular", lessonController.getPopularLessons);
router.post("/", lessonController.addLesson);

module.exports = router;
