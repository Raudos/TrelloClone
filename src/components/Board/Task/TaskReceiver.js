import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';


const taskTarget = {
  drop(props, monitor, component) {
    const droppedItem = monitor.getItem();
    const receiver = props;
    
    receiver.handleTaskDrop(receiver, droppedItem);
  },
  hover(props, monitor, component) {
    const draggedItem = monitor.getItem();
    const hoveredItem = props;

    if (hoveredItem.dummy) {
      component.setState({
        showDummy: true
      });
    } else {
      if (hoveredItem.columnsIndex === draggedItem.columnsIndex) {
        if (hoveredItem.tasksIndex !== draggedItem.tasksIndex && hoveredItem.tasksIndex !== draggedItem.tasksIndex + 1) {
          component.setState({
            showDummy: true
          });
        } else if (hoveredItem.tasksIndex === draggedItem.tasksIndex + 1 && hoveredItem.last) {
          component.setState({
            showDummy: true
          });
        }
      } else {
        component.setState({
          showDummy: true
        });
      }
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget("task", taskTarget, collect)
class TaskReceiver extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired
  };

  state = {
    showDummy: false
  };

  componentWillReceiveProps(nextProps) {
    if (!nextProps.isOver && this.state.showDummy) {
      this.setState({
        showDummy: false
      });
    }
  };

  render() {
    const { connectDropTarget, isOver } = this.props;

    if (isOver && this.state.showDummy) {
      return (
        <React.Fragment>
          {connectDropTarget(
            <div className="task-receiver"/>
          )}
          <div className="task dummy"/>
        </React.Fragment>
      );
    }

    return connectDropTarget(
      <div className="task-receiver"/>
    );
  };
};

export default props => (
  <div className="task-receiver-container receiver-container">
    <TaskReceiver {...props} />
  </div>
);
