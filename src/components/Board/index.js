import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from 'react-data-container';

// Components
import Column from "components/Board/Column";

// Other
import { handleTaskDrop } from "redux/actions/board";

@DragDropContext(HTML5Backend)
@Container({
  isLoading: that => !that.props.board,
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      board: state.board
    }),
    actions: { handleTaskDrop }
  }
})
class Board extends React.Component {
  render() {
    const { board } = this.props;

    return (
      <div>
        {board.name}

        <div className="columns-container">
          {board.columns.map((col, index) => (
            <Column key={col.id} column={col} columnsIndex={index} handleTaskDrop={this.props.handleTaskDrop} />
          ))}
        </div>
      </div>
    );
  };
};

export default Board;
