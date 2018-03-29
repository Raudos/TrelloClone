import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

// Components
import Board from "components/Board/index";
import Task from "components/Board/Task/Details";

export default props => (
  <Router>
    <div className="row">
      <Route path={'/'} component={Board} />

      <Route path={`/:id`} exact component={Task} />
    </div>
  </Router>
);
