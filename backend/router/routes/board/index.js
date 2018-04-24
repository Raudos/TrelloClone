const express = require('express');
const R = require('ramda');
const router = express.Router();
const mongoose = require("mongoose");
const { ObjectID } = require('mongodb');

// Models
const { Board } = require("../../../models/board");
const { Column } = require("../../../models/column");
const { Task } = require("../../../models/task");

// Other

function getTasks(idsArr) {
  return Task.find({
    '_id': { $in: idsArr.map(id => mongoose.Types.ObjectId(id))}
  });
};

function getColumns(idsArr) {
  return Column.find({
    '_id': { $in: idsArr.map(id => mongoose.Types.ObjectId(id))}
  });
};

function fillStructureWithData(structure, columns, tasks) {
  const copiedStructure = structure.concat();
  // Multiple queries vs this ...?
  return structure.map(structualColumn => ({
    ...columns.filter(column => column._id.equals(structualColumn.id))[0]._doc,
    tasks: structualColumn.tasks.map(taskId => {

      return tasks.filter(task => task._id.equals(taskId.toString()))[0]
    })
  }));
};

router.get("/", (req, res) => {
  // For now
  Board.find().then(boards => {
    const board = boards[0];
    const columnIds = board.structure.map(column => column.id);
    const taskIds = R.flatten(board.structure.map(column => column.tasks));

    Promise.all([getColumns(columnIds), getTasks(taskIds)])
      .then(values => {
        res.send({
          ...board._doc,
          structure: fillStructureWithData(board.structure, values[0], values[1])
        });
      })
      .catch(e => {
        console.log(e);
      });
  });
});

router.get('/details/:id', (req, res) => {

});

function parseReceivedStructure(structure) {
  const parsedStructure = R.clone(structure);

  parsedStructure.forEach(column => {
    // Is it even different ?????
    column.id = ObjectID(column._id);
    column.tasks = column.tasks.map(task => ObjectID(task._id));

    delete column._id;
    delete column.name;
    delete column.board;
    delete column.__v;
  });

  return parsedStructure;
};

router.put('/moveTask', (req, res) => {
  const newStructure = parseReceivedStructure(req.body.updatedStructure);

  Board.update({_id: req.body.boardId}, { $set: { structure: newStructure }})
    .then(data => {
      res.status(200).send({status: "updated"});

      io.emit("updateStructure", {
        socketId: req.body.socketId,
        structure: req.body.updatedStructure
      });
    })
    .catch(e => {
      res.status(400).send(e);
    })
});

router.get('/createBoard', (req, res) => {

});

router.get('/updateBoard', (req, res) => {

});

router.get('/createLabel', (req, res) => {

});

router.get('/updateLabel', (req, res) => {

});

router.get('/deleteLabel', (req, res) => {

});

module.exports = router;
