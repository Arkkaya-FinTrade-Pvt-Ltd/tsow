//const router = express.Router();
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
dotenv.config({path: './config/config.env'});
const connectDB = require('./config/db');
require('./models/User');

//body-parser  use for  pass the body of data and get the data from front end in json format ot pass database
app.use(bodyparser.json());

//mongodb connection and schema calling

const User = mongoose.model('tsowUser');

// Load config

// Passport config
//require('./config/passport')(passport);
//require('./middleware/auth');
connectDB();

app.get('/view', (req, res) => {
  User.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.post('/savedata', (req, res) => {
  const user = new User({
    first_name: req.body.firstname,
    last_name: req.body.lastname,
    e_email: req.body.email,
  }); //data from frontend
  //save data in mongodb
  user
    .save()
    .then((data) => {
      console.log(data);
      // res.send("success")//msg for frontend
    })
    .catch((err) => {
      console.log(err);
    });
});

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
/*

// Routes
const userRoute = require('./Router/User');
const authRoutes = require('./Router/auth');
app.use(body_parser.json());
app.use(userRoute);
app.use(authRoutes);
// app.use('/', require('./Router/index'));
// app.use('/auth', require('./Router/auth')); */

//app.use('/Home', require('./Router/Home'));
const PORT = process.env.PORT || 3000;

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`),
);
//app.use('/User', User);
