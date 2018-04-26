import React from 'react';
import PropTypes from "prop-types";
import { DragSource } from 'react-dnd';
import Container from 'react-data-container';

// Components
import Task from "src/components/Board/Task/Task";
import TaskReceiver from "src/components/Board/Task/TaskReceiver";
import ColumnTitle from "src/components/Board/Title";
import AddTask from "src/components/Board/Task/AddTask";

const columnSource = {
	beginDrag(props) {
		return props;
	}
};

function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		connectDragPreview: connect.dragPreview(),
		isDragging: monitor.isDragging(),
	};
};

@DragSource('column', columnSource, collect)
@Container({
	isLoading: that => !that.props.column,
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      column: state.columns[ownProps.columnId]
    }),
    actions: { }
  }
})
class Columns extends React.Component {
  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
  };

	handleNameChange = name => {
		this.props.handleColumnNameChange(this.props.column.id, name);
	};

  render() {
    const { column, tasks, columnsIndex, handleTaskDrop, connectDragSource, isDragging, match } = this.props;
		
    return connectDragSource(
      <div className={`column ${isDragging ? "dragged" : ""}`}>
        <ColumnTitle title={column.name} updateTitle={this.handleNameChange} />

        {tasks.map((taskId, index) => {
          if (index === tasks.length - 1) {
            return (
              <React.Fragment key={taskId}>
                <TaskReceiver
									associatedTask={taskId}
									tasksIndex={index}
									columnsIndex={columnsIndex}
									handleTaskDrop={handleTaskDrop}
								/>

                <Task
									match={match}
									taskId={taskId}
									tasksIndex={index}
									columnsIndex={columnsIndex}
								/>

                <TaskReceiver
									associatedTask={taskId}
									tasksIndex={index + 1}
									columnsIndex={columnsIndex}
									handleTaskDrop={handleTaskDrop}
									last
								/>
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={taskId}>
              <TaskReceiver
								associatedTask={taskId}
								tasksIndex={index}
								columnsIndex={columnsIndex}
								handleTaskDrop={handleTaskDrop}
							/>

              <Task
								match={match}
								taskId={taskId}
								tasksIndex={index}
								columnsIndex={columnsIndex}
							/>
            </React.Fragment>
          );
        })}

        {tasks.length ?
          null

          :

          <TaskReceiver columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} dummy />
        }

				<AddTask />
      </div>
    );
  };
};

export default Columns;
