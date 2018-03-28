import shortid from "shortid";
const R = require('ramda');

class Board {
  constructor(name, colNbr, tasksNbr) {
    this.id = shortid.generate();
    this.name = name || "Board";
    this.columns = this.seedColumns(colNbr, tasksNbr);
  };

  seedColumns = (colNbr, tasksNbr) => {
    const columns = [];

    for (let i = 0; i < colNbr; i++) {
      columns.push({id: shortid.generate(), name: `Col-${i + 1}`,tasks: []});
    }

    for (let i = 0; i < tasksNbr; i++) {
      columns[Math.floor(Math.random() * colNbr)].tasks.push({id: shortid.generate(), name: `Task-${i + 1}`});
    }

    return columns;
  };
}

export const seedBoard = () => {
  return (dispatch, getState) => {
    dispatch({
      type: "seedBoard",
      data: new Board("My Board", 5, 8)
    });
  };
};

function findUpdatedIndex(receiver, dropped, isLast, key) {
  if (isLast) {
    return -1;
  } else if (dropped[key] < receiver[key]) {
    return 1;
  }

  return 0;
};

export const handleTaskDrop = (receiver, dropped) => {
  return (dispatch, getState) => {
    const columns = R.clone(getState().board.columns);
    const isLast = receiver.last;

    if (receiver.columnsIndex === dropped.columnsIndex) {
      columns[dropped.columnsIndex].tasks.splice(receiver.tasksIndex - findUpdatedIndex(receiver, dropped, isLast, "tasksIndex"), 0, ...columns[dropped.columnsIndex].tasks.splice(dropped.tasksIndex, 1));
    } else {
      columns[receiver.columnsIndex].tasks.splice(receiver.tasksIndex - (isLast ? -1 : 0), 0, columns[dropped.columnsIndex].tasks[dropped.tasksIndex]);
      columns[dropped.columnsIndex].tasks.splice(dropped.tasksIndex, 1);
    }

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};

export const handleColumnDrop = (receiver, dropped) => {
  return (dispatch, getState) => {
    const columns = R.clone(getState().board.columns);
    const isLast = receiver.last;

    columns.splice(receiver.columnsIndex - findUpdatedIndex(receiver, dropped, isLast, "columnsIndex"), 0, ...columns.splice(dropped.columnsIndex, 1));

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};
