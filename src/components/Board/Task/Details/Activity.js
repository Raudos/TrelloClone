import React from "react";
import moment from "moment";

import Avatar from "components/Avatar";

const Comment = props => (
  <div className="activity comment">
    <p>{props.activity.user}</p>
    <p>{props.activity.comment}</p>
    <p>{moment(props.activity.date).format("YYYY.MM.DD H:mm")}</p>
  </div>
);

const ColumnChange = props => (
  <div className="activity column-change">
    <p><span>{props.activity.user}</span> added this card to {props.activity.columnId}</p>
    <p>{moment(props.activity.date).format("YYYY.MM.DD H:mm")}</p>
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
            return <ColumnChange key={activity.id} activity={activity} />;
          } else if (activity.type === "comment") {
            return <Comment key={activity.id} activity={activity} />;
          }

          return null;
        })}
      </div>
    </section>
  )
}
