import BoardUpdater from "src/redux/reducers/board";
import ColumnsUpdater from 'src/redux/reducers/columns';
import TasksUpdater from "src/redux/reducers/tasks";
import LoaderUpdater from "src/redux/reducers/loaded";
import TaskDetailsUpdater from 'src/redux/reducers/taskDetails';
import SocketUpdater from 'src/redux/reducers/socket';

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    loaded: LoaderUpdater(nextState.loaded, action),
    board: BoardUpdater(nextState.board, action),
    columns: ColumnsUpdater(nextState.columns, action),
    tasks: TasksUpdater(nextState.tasks, action),
    taskDetails: TaskDetailsUpdater(nextState.taskDetails, action),
    socket: SocketUpdater(nextState.socket, action)
  };
};
