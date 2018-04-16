import React from 'react';

export default class Search extends React.Component {
  state = {
    toggled: false,
    input: ""
  };

  toggleSearch = () => {
    this.setState(state => ({
      toggled: !state.toggled,
      input: ""
    }));
  };

  handleChange = e => {
    this.setState({
      input: e.target.value
    });
  };

  render() {
    return (
      <div className={`menu-search ${this.state.toggled ? "toggled" : ""}`}>
        <input
          type="text"
          value={this.state.input}
          onFocus={this.toggleSearch}
          onBlur={this.toggleSearch}
          onChange={this.handleChange}
        />

        {this.state.toggled ?
          <i className="fas fa-times"></i>

          :

          <i className="fas fa-search"></i>
        }
      </div>
    );
  };
};
