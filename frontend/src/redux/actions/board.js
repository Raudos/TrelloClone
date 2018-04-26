import shortid from "shortid";
const R = require('ramda');
import axios from 'axios';

// Logic
const { handleTaskMovement, handleColumnMovement } = require("../../../../sharedLogic/updateStructure");

export const downloadTaskDetails = id => {
  return (dispatch, getState) => {
    axios({
      url: `http://localhost:3000/task/details/${id}`
    }).then(res => {
      dispatch({
        type: "downloadTaskDetails",
        data: res.data.task
      });
    })
  };
};

export const downloadBoard = () => {
  return (dispatch, getState) => {
    axios({
      url: "http://localhost:3000/board"
    }).then(res => {
      dispatch({
        type: "seedBoard",
        data: res.data
      });
    })
  };
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
    const updatedStructure = handleTaskMovement(getState().board.structure, receiver, dropped);

    dispatch({
      type: "updateColumns",
      data: updatedStructure
    });

    axios({
      method: "PUT",
      data: {
        boardId: getState().board._id,
        socketId: getState().socket.id,
        movementData: {
          movedTaskId: dropped.task._id,
          destination: {
            columnsIndex: receiver.columnsIndex,
            tasksIndex: receiver.tasksIndex || 0
          }
        }
      },
      url: "http://localhost:3000/board/moveTask"
    }).then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e);
    })
  };
};

export const updateBoardStructure = newStructure => {
  return (dispatch, getState) => {
    dispatch({
      type: "updateColumns",
      data: newStructure
    });
  };
};

export const handleColumnDrop = (receiver, dropped) => {
  return (dispatch, getState) => {
    const updatedStructure = handleColumnMovement(getState().board.structure, receiver, dropped);

    dispatch({
      type: "updateColumns",
      data: updatedStructure
    });

    axios({
      method: "PUT",
      data: {
        boardId: getState().board._id,
        socketId: getState().socket.id,
        movementData: {
          movedColumnId: dropped.column._id,
          destination: {
            columnsIndex: receiver.columnsIndex
          }
        }
      },
      url: "http://localhost:3000/board/moveColumn"
    }).then(data => {
      console.log(data);
    }).catch(e => {
      console.log(e);
    })
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
