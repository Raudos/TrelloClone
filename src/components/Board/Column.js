import React from 'react';
import PropTypes from "prop-types";
import { DragSource } from 'react-dnd';

import Task from "components/Board/Task";
import TaskReceiver from "components/Board/TaskReceiver";

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
	}
}

@DragSource('column', columnSource, collect)
class Columns extends React.Component {
  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const { column, columnsIndex, handleTaskDrop, connectDragSource, isDragging } = this.props;

    if (isDragging) {
      return connectDragSource(<div>Dragging</div>);
    }

    return connectDragSource(
      <div className="column">
        {column.name}

        {column.tasks.map((task, index) => {
          if (index === column.tasks.length - 1) {
            return (
              <React.Fragment key={task.id}>
                <TaskReceiver associatedTask={task} tasksIndex={index} columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} />

                <Task task={task} tasksIndex={index} columnsIndex={columnsIndex} />

                <TaskReceiver associatedTask={task} tasksIndex={index} columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} last />
              </React.Fragment>
            );
          }

          return (
            <React.Fragment key={task.id}>
              <TaskReceiver associatedTask={task} tasksIndex={index} columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} />

              <Task task={task} tasksIndex={index} columnsIndex={columnsIndex} />
            </React.Fragment>
          );
        })}

        {column.tasks.length ?
          null

          :

          <TaskReceiver columnsIndex={columnsIndex} handleTaskDrop={handleTaskDrop} dummy />
        }
      </div>
    );
  };
};

export default Columns;
