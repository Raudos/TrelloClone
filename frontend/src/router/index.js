import React from 'react';
import { HashRouter as Router, Route } from "react-router-dom";

// Components
import Board from "src/components/Board/index";
import Task from "src/components/Board/Task/Details/index";

function mergeProps(component, ...rest) {
  return React.createElement(component, Object.assign({}, ...rest));
};

export default props => (
  <Router>
    <div className="row">
      <Route path={'/'} {...props} component={routeProps => mergeProps(Board, routeProps, props)} />

      <Route path={`/:id`} exact {...props} component={routeProps => mergeProps(Task, routeProps, props)} />
    </div>
  </Router>
);
