var express = require('express');
var router = express.Router();
var mongoose = require('mongoose')
var ObjectId = mongoose.Types.ObjectId;

const Profile = require("../models/Profile");

/* GET all proile listings. */
router.get('/getProfile', (req, res) => {
  Profile.find((err, docs) => {
    if (!err) {
      res.status(200).json({
        ProfileResult: docs
      });
    } else {
      res.status(404).json({
        msg: error.message
      });
      console.log("Error in Retrieving Tasks: " + JSON.stringify(err, undefined, 2))
    }
  })
})

/* add proile. */
router.post('/addProile', (req, res) => {

  var profile = new Profile({
    nickName: req.body.nickName,
    date: req.body.date
  });
  profile.save((err, docs) => {
    if (!err) {
      res.status(200).send(docs)
    } else {
      res.status(404).json({
        msg: err.message
      });
      console.log("Error in Saving Proile: " + JSON.stringify(err, undefined, 2))
    }
  });
});

//get profile by id
router.get('/:id', (req, res) => {

  if (!ObjectId.isValid(req.params.id))
    res.status(404).send(`no record with given id : ${req.params.id}`);

  Profile.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).json({
        ProfileResultById: docs
      });
    } else {
      res.status(404).json({
        msg: err.message
      });
      console.log("Error in Retrieving Tasks: " + JSON.stringify(err, undefined, 2))
    }

  });

});

//update profile
router.put('/edit/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    res.status(404).send(`no record with given id : ${req.params.id}`);

  var profile = {
    nickName: req.body.nickName,
    date: req.body.date
  };
  Profile.findByIdAndUpdate(req.params.id, {
    $set: profile
  }, {
    new: true
  }, (err, docs) => {
    if (!err) {
      res.status(200).json({
        updatedProfile: docs
      });
    } else {
      res.status(404).json({
        msg: err.message
      });
      console.log("Error in Saving tasks: " + JSON.stringify(err, undefined, 2))
    }
  });
})

/* Delete profile */
router.delete('/delete/:id', (req, res) => {
  if (!ObjectId.isValid(req.params.id))
    res.status(404).send(`no record with given id : ${req.params.id}`);

  Profile.findByIdAndDelete(req.params.id, (err, docs) => {
    if (!err) {
      res.status(200).json({
        updatedProfile: docs
      });
    } else {
      res.status(404).json({
        msg: err.message
      });
      console.log("Error in Saving Task: " + JSON.stringify(err, undefined, 2))
    }
  })
})

module.exports = router;