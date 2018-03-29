import React from "react";
import PropTypes from "prop-types";
import { DragSource } from 'react-dnd';

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
	}
}

@DragSource('task', taskSource, collect)
export default class Task extends React.Component {
  static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDragPreview: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
  };
  render() {
    const { connectDragSource, isDragging } = this.props

    if (isDragging) {
			return connectDragSource(
				<div className="task break-text">
					{this.props.task.name}
				</div>
			);
    }

		return connectDragSource(
			<div className="task break-text">
				{this.props.task.name}
			</div>
		);
  };
};
