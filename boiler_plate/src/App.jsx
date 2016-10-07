import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
const socket = new WebSocket("ws://localhost:4000/socketserver");
const data = {
  currentUser: '',
  messages: [],
  usersOnline: ''
};

const App = React.createClass({

  getInitialState() {
    console.log('STATE');
    return {data: data};
  },

  componentDidMount: function() {
    console.log('MOUNT');
    let dataArr = this.state.data;

    socket.onopen = function() {
      console.log("Connected to websocket server");
    };

    socket.onmessage = (event) => {
      var incoming = JSON.parse(event.data);
      console.log(incoming.color);
      switch(incoming.type) {
        case 'colorAssigned':
        $(".username").css({color: incoming.color});
        case 'number':
        dataArr.usersOnline = incoming.number;
        case 'incomingMessage':
        dataArr.messages.push({
          type: incoming.type,
          id: incoming.id,
          username: incoming.username,
          content: incoming.content,
          color: incoming.color
        });
          break;
        case 'incomingNotification':
        dataArr.messages.push({
          type: incoming.type,
          id: incoming.id,
          oldName: incoming.oldUsername,
          newName: incoming.newUsername,
          color: incoming.color
        })
          break;
        default:
          throw new Error('Unknown event type' + incoming.type);
      }
      console.log(dataArr);
      this.setState({data:dataArr});
    };
  },

  getNotification: function (type, oldUsername, newUsername) {
    let notification = {
      type: type,
      oldUsername: oldUsername,
      newUsername: newUsername
    };
    socket.send(JSON.stringify(notification));
  },

  getInfo: function(type, username, sentence) {
    console.log('GETINFO');
    // this.state.data.messages.push({username: username, content: sentence});
    let msg = {
      type: type,
      username: username,
      content: sentence
    };
    socket.send(JSON.stringify(msg));
  },

  render() {
    console.log('RENDER');
    // console.log(this.socket);
    return (
      <div className="wrapper">
        <nav>
          <h1>Chatty</h1>
          <span>Users Online: {this.state.data.usersOnline}</span>
        </nav>
          <MessageList messages={this.state.data.messages} />
          <ChatBar
          currentUser={this.state.data.currentUser}
          getInfo={this.getInfo}
          getNotification={this.getNotification} />
      </div>
    );
  }
});

export default App;
