const express = require('express');
const R = require('ramda');
const router = express.Router();
const mongoose = require("mongoose");

// Models
const { Board } = require("../../../models/board");
const { Column } = require("../../../models/column");
const { Task } = require("../../../models/task");

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
  // Multiple queries vs this ...?
  return structure.map(structualColumn => ({
    ...columns.filter(column => column._id.equals(structualColumn.id))[0]._doc,
    tasks: tasks.filter(task => {
      const taskId = task._id.toString();
      const stringifiedTaskIds = structualColumn.tasks.map(id => id.toString());

      return stringifiedTaskIds.includes(taskId);
    })
  }));
};

router.get("/", (req, res) => {
  // For now
  Board.find().then(async boards => {
    const board = boards[0];
    const columnIds = board.structure.map(column => column.id);
    const taskIds = R.flatten(board.structure.map(column => column.tasks));

    const tasks = await getTasks(taskIds);
    const columns = await getColumns(columnIds);

    res.send({
      ...board._doc,
      structure: fillStructureWithData(board.structure, columns, tasks)
    });
  });
});

router.get('/details/:id', (req, res) => {

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
