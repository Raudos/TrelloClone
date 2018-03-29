import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ReactDOM from "react-dom";

const taskTarget = {
  drop(props, monitor, component) {
    const droppedItem = monitor.getItem();
    const receiver = props;

    receiver.handleTaskDrop(receiver, droppedItem);
  },
  hover(props, monitor, component) {
    const draggedItem = monitor.getItem();
    const hoveredItem = props;
    const height = window.getComputedStyle(ReactDOM.findDOMNode(document.getElementsByClassName("column")[draggedItem.columnsIndex].querySelectorAll("div.task")[draggedItem.tasksIndex])).getPropertyValue("height");

    if (hoveredItem.dummy) {
      component.setState({
        showDummy: height
      });
    } else {
      if (hoveredItem.columnsIndex === draggedItem.columnsIndex) {
        if (hoveredItem.tasksIndex !== draggedItem.tasksIndex && hoveredItem.tasksIndex !== draggedItem.tasksIndex + 1) {
          component.setState({
            showDummy: height
          });
        } else if (hoveredItem.tasksIndex === draggedItem.tasksIndex + 1 && hoveredItem.last) {
          component.setState({
            showDummy: height
          });
        }
      } else {
        component.setState({
          showDummy: height
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
          <div style={{height: this.state.showDummy}} className="task dummy"/>
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
