const express = require("express");
const router = express.Router();
const {
  getAllWorkouts,
  getSingleWorkout,
  postnewWorkout,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutController");

// Get all workouts
router.get("/", getAllWorkouts);

// Get single workout
router.get("/:id", getSingleWorkout);

// Post a new workout
router.post("/", postnewWorkout);

// Update a workout
router.put("/:id", updateWorkout);

// Delete a workout
router.delete("/:id", deleteWorkout);

module.exports = router;
