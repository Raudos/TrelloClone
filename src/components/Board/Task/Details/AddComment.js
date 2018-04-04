import React from "react";

import Avatar from "components/Avatar";

export default class AddComment extends React.Component {
  state = {
    comment: ""
  };

  render() {
    return (
      <section className="section-container">
        <div className="section-title">
          <i className="far fa-comment main-icon"></i>

          <h3>Add Comment</h3>
        </div>

        <div className="add-comment main-section">
          <Avatar />

          <div className="text-container">
            <textarea
              placeholder="Write a comment ..."
              value={this.state.comment}
              onChange={e => this.setState({comment: e.target.value})}
            />

          <div className={`button ${this.state.comment ? "confirm" : "dimmed"}`} onClick={() => this.props.addComment(this.state.comment)}>
              Save
            </div>
          </div>
        </div>
      </section>
    );
  };
};
