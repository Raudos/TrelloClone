const express = require('express');
var { ObjectID } = require('mongodb');

const router = express.Router();

// Models
const { Task } = require("../../../models/task");

router.get('/details/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Task.findById(id).then(task => {
    res.send({task});
  }, (e) => {
    res.status(400).send(e);
  });
});

router.get('/createTask', (req, res) => {

});

router.get('/updateTask', (req, res) => {

});

router.get('/deleteTask', (req, res) => {

});

router.get('/addComment', (req, res) => {

});

module.exports = router;
