import React from 'react';

import Title from "components/Board/Title";

function handleNameChange(props) {
  return name => {
    props.handleTaskNameChange(props.column.id, props.task.id, name);
  };
};

export default props => (
  <div className="task-header">
    <i className="far fa-credit-card task-icon" />

    <div className="task-information">
      <Title title={props.task.name} updateTitle={handleNameChange(props)} />

      <p className="column-title">
        in list <span>{props.column.name}</span>
      </p>
    </div>

    <i className="fas fa-times close-task" onClick={() => props.history.push('/')} />
  </div>
);
