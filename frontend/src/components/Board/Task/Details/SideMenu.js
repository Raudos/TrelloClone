import React from "react";

const Button = props => (
  <div className="side-menu-button">
    <i className={props.iconClass} />

    {props.text}
  </div>
);

const AddButtons = [{
  iconClass: "fas fa-user",
  text: "Members"
}, {
  iconClass: "fas fa-tag",
  text: "Labels"
}, {
  iconClass: "fas fa-clipboard-check",
  text: "Checklist"
}, {
  iconClass: "far fa-clock",
  text: "Due Date"
}, {
  iconClass: "fas fa-paperclip",
  text: "Attachment"
}];

const ActionButtons = [{
  iconClass: "fas fa-arrow-right",
  text: "Move"
}, {
  iconClass: "fas fa-credit-card",
  text: "Copy"
}, {
  iconClass: "fas fa-eye",
  text: "Watch"
}, {
  iconClass: "far fa-trash-alt",
  text: "Delete"
}];

export default props => (
  <div className="side-menu">
    <h3>Add</h3>

    {AddButtons.map(button => (
      <Button key={button.text} {...button} />
    ))}

    <h3>Actions</h3>

    {ActionButtons.map(button => (
      <Button key={button.text} {...button} />
    ))}
  </div>
);
