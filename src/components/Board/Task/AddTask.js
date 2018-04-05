import React from "react";

export default class AddTask extends React.Component {
  state = {
    creator: false
  };

  render() {
    if (this.state.creator) {
      <div className="task-creator">

      </div>
    }

    return (
      <div className="add-task">
        Add a card ...
      </div>
    );
  };
};
