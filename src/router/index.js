import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

// Components
import Board from "components/Board/index";

const Task = props => {
  return (
    <div>
      Task
      {props.match.params.id}
    </div>
  )
}

export default props => (
  <Router>
    <div>
      <Board />

      <Route path={`/:id`} component={Task} />
    </div>
  </Router>
);
