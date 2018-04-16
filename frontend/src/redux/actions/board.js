import shortid from "shortid";
const R = require('ramda');

class User {
  constructor(name) {
    this.id = shortid.generate();
    this.name = name;
  };
};

class Activity {
  constructor(type, user) {
    this.id = shortid.generate();
    this.type = type;
    this.date = new Date();
    this.user = user;
  };
};

class Comment extends Activity {
  constructor(comment, user) {
    super("comment", user);

    this.comment = comment;
    this.edited = false;
  };
};

class ColumnChange extends Activity {
  constructor(columnId, user) {
    super("columnChange", user);

    this.columnId = columnId;
  };
};

class Task {
  constructor(name, columnId) {
    this.id = shortid.generate();
    this.name = name;
    this.activities = [new ColumnChange(columnId, "Me")];
  };

  addActivity(newActivity) {
    if (newActivity instanceof Activity) {
      this.activities.unshift(newActivity);
    }
  };
};

class Column {
  constructor(name) {
    this.id = shortid.generate();
    this.name = name;
    this.tasks = [];
  };

  addTask(name, columnId) {
    this.tasks.push(new Task(name, this.id));
  };
};

class Board {
  constructor(name, colNbr, tasksNbr) {
    this.id = shortid.generate();
    this.name = name || "Board";
    this.fav = false;
    this.personal = true;
    this.private = true;

    this.seedColumns(colNbr, tasksNbr);
  };

  seedColumns = (colNbr, tasksNbr) => {
    const columns = [];

    for (let i = 0; i < colNbr; i++) {
      columns.push(new Column(`Col-${i + 1}`));
    }

    for (let i = 0; i < tasksNbr; i++) {
      columns[Math.floor(Math.random() * colNbr)].addTask(`Task-${i + 1}`);
    }

    this.columns = columns;
  };
};

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

export const addNewColumn = name => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateColumns",
      data: [
        ...getState().board.columns,
        new Column(name)
      ]
    });
  };
};

export const handleTaskDrop = (receiver, dropped) => {
  return (dispatch, getState) => {
    const columns = R.clone(getState().board.columns);
    const isLast = receiver.last;

    if (receiver.columnsIndex === dropped.columnsIndex) {
      columns[dropped.columnsIndex].tasks.splice(receiver.tasksIndex - findUpdatedIndex(receiver, dropped, isLast, "tasksIndex"), 0, ...columns[dropped.columnsIndex].tasks.splice(dropped.tasksIndex, 1));
    } else {
      columns[dropped.columnsIndex].tasks[dropped.tasksIndex].activities.push(new ColumnChange(columns[receiver.columnsIndex].id, "Me"));
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

export const handleColumnNameChange = (id, name) => {
  return (dispatch, getState) => {
    const columns = getState().board.columns.map(column => {
      if (column.id === id) {
        return {
          ...column,
          name
        };
      }

      return column;
    });

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};

export const handleTaskNameChange = (colId, taskId, name) => {
  return (dispatch, getState) => {
    const columns = getState().board.columns.map(column => {
      if (column.id === colId) {
        return {
          ...column,
          tasks: column.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                name
              };
            }

            return task
          })
        };
      }

      return column;
    });

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};

export const addComment = (colId, taskId, comment) => {
  return (dispatch, getState) => {
    const columns = getState().board.columns.map(column => {
      if (column.id === colId) {
        return {
          ...column,
          tasks: column.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                activities: [new Comment(comment, "Me"), ...task.activities]
              };
            }

            return task
          })
        };
      }

      return column;
    });

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};

export const deleteComment = (colId, taskId, commentId) => {
  return (dispatch, getState) => {
    const columns = getState().board.columns.map(column => {
      if (column.id === colId) {
        return {
          ...column,
          tasks: column.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                activities: task.activities.filter(activity => activity.id !== commentId)
              };
            }

            return task
          })
        };
      }

      return column;
    });

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};

export const editComment = (colId, taskId, commentId, newComment) => {
  return (dispatch, getState) => {
    const columns = getState().board.columns.map(column => {
      if (column.id === colId) {
        return {
          ...column,
          tasks: column.tasks.map(task => {
            if (task.id === taskId) {
              return {
                ...task,
                activities: task.activities.map(activity => {
                  if (activity.id === commentId) {
                    return {
                      ...activity,
                      edited: true,
                      comment: newComment
                    };
                  }

                  return activity;
                })
              };
            }

            return task
          })
        };
      }

      return column;
    });

    dispatch({
      type: "updateColumns",
      data: columns
    });
  };
};