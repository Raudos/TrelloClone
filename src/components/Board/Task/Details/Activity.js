import React from "react";
import moment from "moment";

import Avatar from "components/Avatar";

class Comment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      edit: false,
      comment: this.props.activity.comment
    };
  };

  editComment = () => {
    this.setState({
      edit: false
    }, () => {
      this.props.editComment(this.props.activity.id, this.state.comment);
    })
  };

  deleteComment = () => this.props.deleteComment(this.props.activity.id);

  render() {
    return (
      <div className="activity-container">
        <Avatar />

        <div className="activity comment">
          <p className="user">{this.props.activity.user}</p>

          {this.state.edit ?
            <div className="text-container">
              <textarea
                value={this.state.comment}
                onChange={e => this.setState({comment: e.target.value})}
              />

              <div className={`button confirm`} onClick={this.editComment}>
                Save
              </div>

              <div className={`button confirm`} onClick={() => this.setState({edit: false})}>
                Cancel
              </div>
            </div>

            :

            <div className="comment-text">
              {this.state.comment}
            </div>
          }

          {this.state.edit ?
            null

            :

            <div className="info">
              <p className="date">
                {moment(this.props.activity.date).format("YYYY.MM.DD H:mm")}
                {this.props.activity.edited ?
                  <span> (edited)</span>

                  :

                  null
                }
              </p>
              <div className="option-container">
                <span>-</span>
                <p className="option" onClick={() => this.setState({edit: true})}>Edit</p>
              </div>
              <div className="option-container">
                <span>-</span>
                <p className="option" onClick={this.deleteComment}>Delete</p>
              </div>
            </div>
          }
        </div>
      </div>
    );
  };
};

const ColumnChange = props => (
  <div className="activity-container">
    <Avatar />

    <div className="activity column-change">
      <p><span className="user">{props.activity.user}</span> added this card to {props.activity.columnId}</p>

      <div className="info">
        <p className="date">{moment(props.activity.date).format("YYYY.MM.DD H:mm")}</p>
      </div>
    </div>
  </div>
);

export default props => {
  return (
    <section className="section-container">
      <div className="section-title">
        <i className="fas fa-list-ul main-icon"></i>

        <h3>Activity</h3>
      </div>

      <div className="activities main-section">
        {props.activities.map(activity => {
          if (activity.type === "columnChange") {
            return <ColumnChange key={activity.id} {...props} activity={activity} />;
          } else if (activity.type === "comment") {
            return <Comment key={activity.id} {...props} activity={activity} />;
          }

          return null;
        })}
      </div>
    </section>
  )
}
