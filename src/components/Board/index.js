import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from 'react-data-container';

// Components
import Column from "components/Board/Column/Column";
import ColumnReceiver from "components/Board/Column/ColumnReceiver";

// Other
import { handleTaskDrop, handleColumnDrop } from "redux/actions/board";

@DragDropContext(HTML5Backend)
@Container({
  isLoading: that => !that.props.board,
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      board: state.board
    }),
    actions: { handleTaskDrop, handleColumnDrop }
  }
})
class Board extends React.Component {
  render() {
    const { board } = this.props;

    return (
      <div>
        {board.name}

        <div className="columns-container">

          {board.columns.map((col, index) => {
            if (index === board.columns.length - 1) {
              return (
                <React.Fragment key={col.id}>
                  <ColumnReceiver column={col} columnsIndex={index} handleColumnDrop={this.props.handleColumnDrop} />

                  <Column key={col.id} column={col} columnsIndex={index} handleTaskDrop={this.props.handleTaskDrop} />

                  <ColumnReceiver column={col} columnsIndex={index} handleColumnDrop={this.props.handleColumnDrop} last />
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={col.id}>
                <ColumnReceiver column={col} columnsIndex={index} handleColumnDrop={this.props.handleColumnDrop} />

                <Column key={col.id} column={col} columnsIndex={index} handleTaskDrop={this.props.handleTaskDrop} />
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };
};

export default Board;
