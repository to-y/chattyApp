import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';

class MessageList extends Component {
  render() {
    return (
    <div className="message-list">
    {this.props.messages.map((message) => {
      if (message.type === 'incomingMessage') {
        return <Message message={message} key={message.id}/>
      } else {
        return <Notification notification={message} key={message.id}/>
      }
    })}
    </div>
    );
  }
}
export default MessageList;

