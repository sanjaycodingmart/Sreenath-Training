import React, { Component } from "react";
import sendIcons from "../images/send.png";
import moment from "moment";
import io from "socket.io-client";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import ScrollToBottom from "react-scroll-to-bottom";
import { apiUrl } from "../config.json";

class ChatWindow extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: []
    };
  }
  componentDidMount() {
    let msgs = [];

    var news = io.connect("http://localhost:8000/news");
    news.on("news", data => {
      let msg = this.state.messages;
      if (!data.admin) {
        toast.success("Got a New Message from " + data.user, {
          position: toast.POSITION.TOP_CENTER
        });
      }
      if (data.user === this.props.user || data.admin === true) msg.push(data);
      this.setState({ messages: msg });
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user !== this.props.user) {
      this.setState({ messages: [] });
      axios.get(apiUrl + `/chat`).then(res => {
        res.data.map(userMsg => {
          if (userMsg.user === this.props.user) {
            this.setState({ messages: [...this.state.messages, userMsg] });
          }
        });
      });
    }
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  handleSend = e => {
    e.preventDefault();
    var news = io.connect("http://localhost:8000/news");
    let message = this.state.message;

    let user = this.props.user;
    let admin = true;

    axios.post(apiUrl + `/chat`, {
      message,
      user,
      admin
    });
    news.emit("news", { message, user, admin });
    news.removeAllListeners("news");

    this.setState({ message: "" });
  };
  render() {
    return this.props.open ? (
      <div>
        <ToastContainer autoClose={2000} />
        <ScrollToBottom className="admin-message-area">
          {this.state.messages.length !== 0
            ? this.state.messages.map(msg => {
                return (
                  <div>
                    <div
                      className={
                        msg.admin && msg.user === this.props.user
                          ? "chat-Youname"
                          : "chat-name"
                      }
                    >
                      {msg.admin && msg.user === this.props.user
                        ? `You`
                        : `${this.props.user}`}
                    </div>
                    <div className={msg.admin ? "admin-msg" : "user-msg"}>
                      <div
                        className={msg.admin ? "admins-admin" : "admins-user"}
                      >
                        <p className="chat-p">{msg.message}</p>
                        <h6 className="chat-time">
                          {moment(msg.createdAt).format("h:mm")}
                        </h6>
                      </div>
                    </div>
                  </div>
                );
              })
            : ""}
        </ScrollToBottom>
        <div>
          <form>
            <input
              className="admin-chat-textbox"
              type="text"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              className="send-button"
              onClick={this.handleSend}
            >
              <img width="25" height="25" alt="" src={sendIcons} />
            </button>
          </form>
        </div>
      </div>
    ) : (
      ""
    );
  }
}

export default ChatWindow;
