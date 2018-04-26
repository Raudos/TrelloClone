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
const { handleTaskMovement, handleColumnMovement } = require("../../../../sharedLogic/updateStructure");

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

function findTasksPosition(structure, taskId) {
  for(let i = 0; i < structure.length; i++) {
    const tasksIndex = structure[i].tasks.findIndex(id => id.equals(taskId));

    if (tasksIndex >= 0) {
      return {
        columnsIndex: i,
        tasksIndex
      };
    }
  }

  // TODO handle this error
  throw "Task doesnt exist!";
};

function findColumnsPosition(structure, columnId) {
  const columnsIndex = structure.findIndex(column => column.id.equals(columnId));

  if (columnsIndex >= 0) {
    return {
      columnsIndex
    };
  }

  // TODO handle this error
  throw "Column doesnt exist!";
};

function updateBoardStructure(res, boardId, socketId, newStructure) {
  Board.update({_id: boardId}, { $set: { structure: newStructure }})
    .then(data => {
      res.status(200).send({status: "updated"});

      io.emit("updateStructure", {
        socketId: socketId,
        structure: newStructure
      });
    })
    .catch(e => {
      res.status(400).send(e);
    })
};

router.put('/moveTask', (req, res) => {
  Board.findById(req.body.boardId)
    .then(board => {
      // Based on provided id find tasks column and its position within it
      const movedTaskPosition = findTasksPosition(board.structure, req.body.movementData.movedTaskId);
      // Update structure based on moved tasks position and place of a receiver
      const newStructure = handleTaskMovement(board.structure, req.body.movementData.destination, movedTaskPosition);

      updateBoardStructure(res, req.body.boardId, req.body.socketId, newStructure);
    })
    .catch(e => {
      console.log(e);
    })
});

router.put('/moveColumn', (req, res) => {
  Board.findById(req.body.boardId)
    .then(board => {
      // Based on provided id find columns position
      const movedColumnsPosition = findColumnsPosition(board.structure, req.body.movementData.movedColumnId);
      // Update structure based on moved columns position and place of a receiver
      const newStructure = handleColumnMovement(board.structure, req.body.movementData.destination, movedColumnsPosition);

      updateBoardStructure(res, req.body.boardId, req.body.socketId, newStructure);
    })
    .catch(e => {
      console.log(e);
    });
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
