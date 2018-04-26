import React from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Container from 'react-data-container';

// Components
import Column from "src/components/Board/Column/Column";
import ColumnReceiver from "src/components/Board/Column/ColumnReceiver";
import BoardDetails from "src/components/Board/BoardDetails/index";
import AddColumn from "src/components/Board/Column/AddColumn";

// Other
import { handleTaskDrop, handleColumnDrop, handleColumnNameChange, addNewColumn } from "src/redux/actions/board";

@DragDropContext(HTML5Backend)
@Container({
  isLoading: that => !that.props.board,
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      board: state.board
    }),
    actions: { handleTaskDrop, handleColumnDrop, handleColumnNameChange, addNewColumn }
  }
})
class Board extends React.Component {
  render() {
    const { board, match } = this.props;

    return (
      <React.Fragment>
        <BoardDetails board={board} />

        <div className="columns-container">
          {board.structure.map((col, index) => {
          
            if (index === board.structure.length - 1) {
              return (
                <React.Fragment key={col._id}>
                  <ColumnReceiver columnId={col._id} columnsIndex={index} handleColumnDrop={this.props.handleColumnDrop} />

                  <Column
                    match={match}
                    columnId={col._id}
                    tasks={col.tasks}
                    columnsIndex={index}
                    handleTaskDrop={this.props.handleTaskDrop}
                    handleColumnNameChange={this.props.handleColumnNameChange}
                  />

                  <ColumnReceiver columnId={col._id} columnsIndex={index + 1} handleColumnDrop={this.props.handleColumnDrop} last />
                </React.Fragment>
              );
            }

            return (
              <React.Fragment key={col._id}>
                <ColumnReceiver columnId={col._id} columnsIndex={index} handleColumnDrop={this.props.handleColumnDrop} />

                <Column
                  match={match}
                  columnId={col._id}
                  tasks={col.tasks}
                  columnsIndex={index}
                  handleTaskDrop={this.props.handleTaskDrop}
                  handleColumnNameChange={this.props.handleColumnNameChange}
                />
              </React.Fragment>
            );
          })}

          <AddColumn addNewColumn={this.props.addNewColumn} />
        </div>
      </React.Fragment>
    );
  };
};

export default Board;
