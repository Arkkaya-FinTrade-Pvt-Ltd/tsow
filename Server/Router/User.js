const express = require('express');
let {User} = require('../models/User');
const router = express.Router();

var objectid = require('mongoose').Types.ObjectId;

//rtetrive controller
router.get('/', (req, res) => {
  User.find((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        'error while retriving record',
        +JSON.stringify(err, undefined, 2),
      );
  });
});
//insert controller
router.post('/save', (req, res) => {
  var newrecord = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
  });
  newrecord.save((err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        'error while passing record',
        +JSON.stringify(err, undefined, 2),
      );
  });
});
//update controller
router.put('/:id', (req, res) => {
  if (objectid.isValid(req.params.id))
    return res.status(400).send('no record with given id:', +req.params.id);

  var updaterecord = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.phone,
    email: req.body.email,
  };
  User.findByIdAndUpdate(req.params.id, {$set: updaterecord}, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        'error while updating record:' + JSON.stringify(err, undefined, 2),
      );
  });
});
//delete controller
router.delete('/:id', (req, res) => {
  if (objectid.isValid(req.params.id))
    return res.status(400).send('no record with given id:', +req.params.id);

  User.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs);
    else
      console.log(
        'error while deleting record:' + JSON.stringify(err, undefined, 2),
      );
  });
});

module.exports = router;

/*
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
*/
