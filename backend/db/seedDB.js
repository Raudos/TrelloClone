const argv = require('yargs').argv;

// DB
const { mongoose } = require('./mongoose');

// Models
const { Board } = require('../models/board');
const { Column } = require('../models/column');
const { Task } = require('../models/task');

const { columns, tasks } = argv;

function createTasks(columns) {
  const taskPromises = [];

  for (let i = 0; i < tasks; i ++) {
    const column = columns[Math.floor(Math.random() * columns.length)];

    const NewTask = new Task({
      name: `Task ${i + 1}`,
      board: column.board,
      column: column._id
    });

    taskPromises.push(NewTask.save());
  };

  return Promise.all(taskPromises)
    .catch(e => {
      console.log("Tasks creation failed.");
      throw e;
    });
};

function createColumns(board) {
  const columnPromises = [];

  for (let i = 0; i < columns; i ++) {
    const NewColumn = new Column({
      name: `Column ${i + 1}`,
      board: board._id
    });

    columnPromises.push(NewColumn.save());
  };

  return Promise.all(columnPromises)
    .catch(e => {
      console.log("Columns creation failed.");
      throw e;
    });
};

function createBoard() {
  const DummyBoard = new Board({
    _id: new mongoose.Types.ObjectId(),
    name: "Dummy Board",
    fav: false,
    personal: true,
    private: true
  });

  return DummyBoard.save()
    .then(async board => {
      const columns = await createColumns(board);
      const tasks = await createTasks(columns);

      return {
        ...board._doc,
        columns,
        tasks
      };
    })
    .then(board => {
      console.log(`New board - ${board.name} creation completed`);
      console.log(`with ${board.columns.length} columns and ${board.tasks.length} tasks.`);

      mongoose.connection.close();
    })
    .catch(e => {
      console.log(e);
      console.log("Board creation failed.");
    });
};

Promise.all([Task.remove(), Column.remove(), Board.remove()])
  .then(() => {
    console.log("Deleted previous Boards, Columns and Tasks.");
    console.log("Creating new ones ...");

    createBoard();
  })
  .catch(e => {
    console.log(e);
    console.log("Could not delete previous data.");
  });
