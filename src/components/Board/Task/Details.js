import React from 'react';

export default class Details extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside = e => {
    if (this.task && !this.task.contains(event.target)) {
      this.props.history.push("/");
    }
  };

  render() {
    return (
      <div className="task-details-container">
        <div className="task-details" ref={task => this.task = task}>
          Task
          {this.props.match.params.id}
        </div>
      </div>
    );
  };
};
