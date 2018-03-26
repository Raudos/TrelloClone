import BoardUpdater from "redux/reducers/board";
import LoaderUpdater from "redux/reducers/loaded";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    loaded: LoaderUpdater(nextState.loaded, action),
    board: BoardUpdater(nextState.board, action)
  };
};
