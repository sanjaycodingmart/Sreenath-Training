import React, { Component } from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Popper from "@material-ui/core/Popper";
import PopupState, { bindToggle, bindPopper } from "material-ui-popup-state";
import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";
import icons from "../images/support.png";
import sendIcons from "../images/send.png";
import io from "socket.io-client";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useEffect } from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../config.json";

class CustomerChat extends Component {
  constructor() {
    super();
    this.state = {
      message: "",
      messages: []
    };
  }
  componentDidMount() {
    let msgs = [];
    let user;
    let admin;

    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      user = decoded.email;
      admin = decoded.isAdmin;
      this.setState({ user, admin });
    }
    axios.get(apiUrl + `/chat`).then(res => {
      res.data.map(userMsg => {
        if (userMsg.user === this.state.user) {
          this.setState({ messages: [...this.state.messages, userMsg] });
        }
      });
    });
    var news = io.connect("http://localhost:8000/news");
    news.on("news", data => {
      let msg = this.state.messages;

      if (data.user === this.state.user && data.admin === true) {
        toast.success("Got a New Message from Admin", {
          position: toast.POSITION.TOP_CENTER
        });
      }
      if (
        data.user === this.state.user ||
        (data.user === this.state.user && data.admin === true)
      )
        msg.push(data);
      this.setState({ messages: msg });
    });
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

    let user = this.state.user;
    let admin = this.state.admin;

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
    console.log(this.state.messages);
    return (
      <div>
        <ToastContainer autoClose={2000} />
        <PopupState variant="popper" popupId="demo-popup-popper">
          {popupState => (
            <div className="chat">
              <Button
                className="chat-but"
                variant="contained"
                color="primary"
                {...bindToggle(popupState)}
              >
                <img width="50" height="50" src={icons} alt="" />
              </Button>
              <Popper
                {...bindPopper(popupState)}
                placement="top-end"
                transition
              >
                {({ TransitionProps }) => (
                  <Fade {...TransitionProps} timeout={350}>
                    <Paper className="chat-paper">
                      <div className="chat-head">
                        <div className="chat-headfont"> Customer Support</div>
                      </div>
                      <ScrollToBottom className="message-area">
                        {this.state.messages.map(msg => {
                          return (
                            <div>
                              <div
                                className={
                                  !msg.admin && msg.user === this.state.user
                                    ? "chat-Youname"
                                    : "chat-name"
                                }
                              >
                                {!msg.admin && msg.user === this.state.user
                                  ? `You`
                                  : `Admin`}
                              </div>
                              <div
                                className={
                                  !msg.admin ? "admin-msg" : "user-msg"
                                }
                              >
                                <div
                                  className={
                                    !msg.admin ? "admins-admin" : "admins-user"
                                  }
                                >
                                  <p className="chat-p">{msg.message}</p>
                                  <h6 className="chat-time">
                                    {moment(msg.createdAt).format("h:mm")}
                                  </h6>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </ScrollToBottom>
                      <div>
                        <form>
                          <input
                            className="chat-textbox"
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
                            <img
                              width="25"
                              height="25"
                              src={sendIcons}
                              alt=""
                            />
                          </button>
                        </form>
                      </div>
                    </Paper>
                  </Fade>
                )}
              </Popper>
            </div>
          )}
        </PopupState>
      </div>
    );
  }
}

export default CustomerChat;
