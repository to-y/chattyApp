import React, {Component} from 'react';


class Message extends Component {
  render() {
    let color = this.props.message.color
    var divStyle = {
      color: color
    };
    console.log(divStyle);
    // console.log(this.props.message);
    // console.log(this.props.notification);
    return (
      <div className="message">
        <span className="username" style={divStyle}>{this.props.message.username}</span>
        <span className="content">{this.props.message.content}</span>
      </div>
    );
  }
}
export default Message;
