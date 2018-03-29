import React from 'react';
import ReactDOM from 'react-dom';

export default class ColumnTitle extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.props.title,
      height: "18px"
    };
  };

  componentDidMount() {
    this.setState({
      height: this.textarea.scrollHeight
    });
  };

  handleChange = e => {
    this.setState({title: e.target.value}, () => {
      if (this.state.height !== this.textarea.scrollHeight) {
        this.setState({
          height: this.textarea.scrollHeight
        });
      }
    })
  };

  render() {
    return (
      <div className="title">
        <textarea
          style={{height: this.state.height}}
          ref={textarea => this.textarea = textarea}
          value={this.state.title}
          onChange={this.handleChange}
          onFocus={e => e.target.select()}
        />
      </div>
    );
  };
};
