const Workout = require("../models/Workout");

// Get all workouts
async function getAllWorkouts(req, res) {
  try {
    const workoutList = await Workout.find();
    res.send(workoutList);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

// Get single workout
async function getSingleWorkout(req, res) {
  try {
    const workout = await Workout.find({ userId: req.params.id });
    res.send(workout);
  } catch (error) {
    res.status(404).send({ error: error.message });
  }
}

// Post a new workout
async function postnewWorkout(req, res) {
  try {
    let emptyFields = [];
    const newWorkout = new Workout();
    newWorkout.title = req.body.title;
    newWorkout.reps = req.body.reps;
    newWorkout.load = req.body.load;
    newWorkout.userId = req.body.userId.split("|")[1];

    if (!newWorkout.title) {
      emptyFields.push("title");
    }

    if (!newWorkout.reps && newWorkout.reps != 0) {
      emptyFields.push("reps");
    }

    if (!newWorkout.load && newWorkout.load != 0) {
      emptyFields.push("load");
    }

    if (emptyFields.length > 0) {
      console.log(emptyFields);
      return res
        .status(400)
        .json({ error: "Please fill in the empty fields!", emptyFields });
    }

    await newWorkout.save();

    res.status(200).send({ message: "Workout saved", Workout: newWorkout });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

// Update a workout
async function updateWorkout(req, res) {
  try {
    const workout = await Workout.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      reps: req.body.reps,
      load: req.body.load,
    });

    res.send(workout);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

// Delete a workout
async function deleteWorkout(req, res) {
  try {
    Workout.findByIdAndRemove(req.params.id).exec();
    res.send({ message: "Work out removed!" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  getAllWorkouts,
  getSingleWorkout,
  postnewWorkout,
  updateWorkout,
  deleteWorkout,
};
