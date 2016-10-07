import React, {Component} from 'react';


class Notification extends Component {
  render() {
    return (
      <div className="message system">
      {(() => {
        if (this.props.notification.type === 'incomingNotification') {
          return <span>User {this.props.notification.oldName} changed his name to {this.props.notification.newName}</span>
        }
      })()}
      </div>
    );
  }
}
export default Notification;
