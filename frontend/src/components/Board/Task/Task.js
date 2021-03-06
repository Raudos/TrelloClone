import React from "react";
import PropTypes from "prop-types";
import { DragSource } from 'react-dnd';
import { Link } from "react-router-dom";
import Container from 'react-data-container';

const taskSource = {
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

@DragSource('task', taskSource, collect)
@Container({
	isLoading: that => !that.props.task,
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      task: state.tasks[ownProps.taskId]
    }),
    actions: { }
  }
})
export default class Task extends React.Component {
  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
  };
  render() {
    const { connectDragSource, isDragging, match } = this.props

    if (isDragging) {
			return connectDragSource(
				<div className="task break-text">
					{this.props.task.name}
				</div>
			);
    }

		return connectDragSource(
			<div className="task break-text">
				<Link to={`${match.url}${this.props.task._id}`}>
					{this.props.task.name}
				</Link>
			</div>
		);
  };
};
