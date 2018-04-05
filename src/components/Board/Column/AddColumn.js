import React from "react";

export default class AddColumn extends React.Component {
  state = {
    creator: false,
    newList: ""
  };

  createNewList = () => {
    if (this.state.newList) {
      this.props.addNewColumn(this.state.newList);
      this.setState({
        creator: false,
        newList: ""
      });
    };
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.input && !prevState.creator) {
      this.input.select();
    }
  };

  render() {
    if (this.state.creator) {
      return (
        <div className="column column-creator">
          <input
            ref={input => this.input = input}
            placeholder="Add a list ..."
            value={this.state.newList}
            onChange={e => this.setState({newList: e.target.value})}
          />

          <div>
            <div className={`button confirm`} onClick={this.createNewList}>
              Save
            </div>

            <div className={`button confirm`} onClick={() => this.setState({creator: false})}>
              Cancel
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="column add-column" onClick={() => this.setState({creator: true})}>
        Add a list ...
      </div>
    );
  };
};
