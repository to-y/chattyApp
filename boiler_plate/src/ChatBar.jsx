import React, {Component} from 'react';

class ChatBar extends Component {
  constructor() {
    super();
    this.state = {
      user: '',
      sentence: ''
    };
  }

  updateSentence(event) {
    this.setState({
      sentence: event.target.value
    })
  }

  handleKeyPress(e) {
    let oldUsername = this.state.user;
    let currentUsername = this.refs.user.value;

    if (e.key === 'Enter') {
      if (oldUsername !== currentUsername){
        this.props.getNotification('postNotification', oldUsername, currentUsername);
        this.props.getInfo('postMessage', this.refs.user.value, this.refs.message.value);
        this.state.sentence = "";
        this.state.user = this.refs.user.value;
      } else {
        this.props.getInfo('postMessage', this.refs.user.value, this.refs.message.value);
        this.state.sentence = "";
        this.state.user = this.refs.user.value;
      }
    }
  }

  render() {
    // console.log(this.state);
    return (
    <div>
    <footer>
      <input
        className="username"
        ref='user'
        type="text"
        placeholder="Your Name (Optional)"/>
      <input
        className="new-message"
        ref='message'
        type="text"
        placeholder="Type a message and hit ENTER"
        value={this.state.sentence}
        onChange={this.updateSentence.bind(this)}
        onKeyPress={this.handleKeyPress.bind(this)} />
    </footer>
    </div>
    );
  }
}
export default ChatBar;

