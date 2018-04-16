import BoardUpdater from "src/redux/reducers/board";
import LoaderUpdater from "src/redux/reducers/loaded";

export default (currentState, action) => {
  var nextState = {...currentState};

  return {
    loaded: LoaderUpdater(nextState.loaded, action),
    board: BoardUpdater(nextState.board, action)
  };
};
