const express = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT;
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user')
const mongoose = require('mongoose');
const cors = require('cors');




//Middleware
app.use(express.json());
app.use(cors());



//Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req, res) => {
    res.send("Welcome to my site");
})


// Connect to db and listeing for requests
mongoose.connect(process.env.MONGO_URI).then(() => {
    app.listen(port);
    console.log(`Database connected and server is listening on ${port}...`);
}).catch((error) => console.log(error));





