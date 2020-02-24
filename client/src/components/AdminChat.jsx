import React, { Component } from "react";
import axios from "axios";
import io from "socket.io-client";
import ChatWindow from "./ChatWindow";
import { apiUrl } from "../config.json";
class AdminChat extends Component {
  constructor() {
    super();

    this.state = {
      user: [],
      messages: [],
      message_data: [],
      open: false
    };
  }
  componentDidMount() {
    axios.get(apiUrl + `/chat`).then(res => {
      let message_data = res.data;
      let newState = [];
      let msg = [];
      this.setState({});
      for (let i = 0; i < res.data.length; i++) {
        newState.push(res.data[i].user);
      }

      let email = window.location.pathname.slice(11);
      if (email.length !== 0) {
        this.setState({ open: true });
        this.setState({ used: email });
      }
      let user = [...new Set(newState)];
      this.setState({ user });
    });
  }
  handleClick = () => {};
  handleOpen = user => {
    this.setState({ open: true });
    this.setState({ used: user });
  };
  render() {
    return (
      <div className="admin-chat">
        <div className="left-chat">
          {this.state.user
            ? this.state.user.map(user => {
                return (
                  <div
                    className="user-left"
                    onClick={() => this.handleOpen(user)}
                  >
                    {user}
                  </div>
                );
              })
            : ""}
        </div>

        <div className="right-chat">
          <ChatWindow
            oldMessages={this.state.message_data}
            user={this.state.used}
            open={this.state.open}
          />
        </div>
      </div>
    );
  }
}

export default AdminChat;
