import React from 'react';
import Container from 'react-data-container';

// Components
import Menu from "src/components/Menu/index";
import Router from "src/router/index";

// Other
import { seedBoard } from "src/redux/actions/board";

@Container({
  isLoading: that => !that.props.loaded,
  onMount: that => that.props.seedBoard(),
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      loaded: state.loaded
    }),
    actions: { seedBoard }
  }
})
class Trello extends React.Component {
  render() {
    return (
      <div className="container-fluid" style={{height: "100vh"}}>
        <Menu />

        <Router />
      </div>
    );
  };
};

export default Trello;