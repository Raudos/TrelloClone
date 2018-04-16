import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

const columnTarget = {
  drop(props, monitor, component) {
    const droppedItem = monitor.getItem();
    const receiver = props;

    receiver.handleColumnDrop(receiver, droppedItem);
  },
  hover(props, monitor, component) {
    const draggedItem = monitor.getItem();
    const hoveredItem = props;

    if (draggedItem.columnsIndex !== hoveredItem.columnsIndex && draggedItem.columnsIndex !== hoveredItem.columnsIndex - 1) {
      component.setState({
        showDummy: true
      });
    } else if (draggedItem.columnsIndex !== hoveredItem.columnsIndex && hoveredItem.last) {
      component.setState({
        showDummy: true
      });
    }
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@DropTarget("column", columnTarget, collect)
class ColumnReceiver extends Component {
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
            <div className="column-receiver"/>
          )}
          <div className="column dummy"/>
        </React.Fragment>
      )
    }

    return connectDropTarget(
      <div className="column-receiver"/>
    );
  };
};

export default props => (
  <div className="receiver-container">
    <ColumnReceiver {...props} />
  </div>
);
