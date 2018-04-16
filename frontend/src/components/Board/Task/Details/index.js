import React from 'react';
import Container from 'react-data-container';
const R = require("ramda");

// Component
import Header from "src/components/Board/Task/Details/Header";
import AddComment from "src/components/Board/Task/Details/AddComment";
import SideMenu from "src/components/Board/Task/Details/SideMenu";
import Activity from "src/components/Board/Task/Details/Activity";

// Other
import { handleTaskNameChange, addComment, deleteComment, editComment } from "src/redux/actions/board";

@Container({
  isLoading: that => !that.props.column,
  isError: that => that.props.column === null,
  Error: that => null,
  Loader: that => <div>Loading</div>,
  Redux: {
    mapStateToProps: (state, ownProps) => {
      try {
        const taskId = ownProps.match.params.id;
        const column = state.board.columns.filter(column => column.tasks.filter(task => task.id === taskId).length)[0];
        const task = column.tasks.filter(task => task.id === taskId)[0];

        return {
          column,
          task
        };
      } catch(e) {
        return {
          column: null
        };
      };
    },
    actions: { handleTaskNameChange, addComment, deleteComment, editComment }
  }
})
class Details extends React.Component {
  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickOutside);
  };

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside);
  };

  handleClickOutside = e => {
    if (this.task && !this.task.contains(e.target)) {
      this.props.history.push("/");
    }
  };

  handleCommentAddition = comment => {
    this.props.addComment(this.props.column.id, this.props.task.id, comment);
  };

  handleCommentDeletion = commentId => {
    this.props.deleteComment(this.props.column.id, this.props.task.id, commentId);
  };

  handleCommentEdition = (commentId, newComment) => {
    this.props.editComment(this.props.column.id, this.props.task.id, commentId, newComment);
  };

  render() {
    return (
      <div className="task-details-container">
        <div className="task-details" ref={task => this.task = task}>
          <Header {...this.props} />

          <div className="menu-container">
            <div className="sections-container">
              <AddComment
                addComment={this.handleCommentAddition}
              />

              <Activity
                activities={this.props.task.activities}
                deleteComment={this.handleCommentDeletion}
                editComment={this.handleCommentEdition}
              />
            </div>

            <SideMenu />
          </div>
        </div>
      </div>
    );
  };
};

export default Details;
