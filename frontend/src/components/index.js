import React from 'react';
import Container from 'react-data-container';

// Components
import Menu from "src/components/Menu/index";
import Router from "src/router/index";

// Other
import { downloadBoard, updateBoardStructure } from "src/redux/actions/board";

@Container({
  isLoading: that => !that.props.loaded && !that.props.socket,
  onMount: that => that.props.downloadBoard(),
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => ({
      loaded: state.loaded,
      socket: state.socket
    }),
    actions: { downloadBoard, updateBoardStructure }
  }
})
class Trello extends React.Component {
  componentDidMount() {
    this.props.socket.on("updateStructure", data => {
      if (data.socketId !== this.props.socket.id) {
        this.props.updateBoardStructure(data.structure);
      }
    });
  };

  componentWillUnmount() {
    this.props.socket.disconnect();
  };

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
