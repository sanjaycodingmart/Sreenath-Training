import React from "react";
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

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2)
  }
}));
var news;
export default function CustoomerChat() {
  const classes = useStyles();
  let user;
  let admin;
  const [message, setMessage] = React.useState("");

  const [messages, setMessages] = React.useState([]);

  if (localStorage.getItem("token")) {
    const decoded = jwt_decode(localStorage.getItem("token"));
    user = decoded.email;
    admin = decoded.isAdmin;
  }
  useEffect(async () => {
    let myMsg = [];
    await axios.get(apiUrl + `/chat`).then(res => {
      res.data.length !== 0
        ? res.data.map(userMsg => {
            if (userMsg.user === user) {
              myMsg.push(userMsg);
            }
          })
        : console.log(myMsg);
    });

    setMessages(myMsg);
  }, []);

  useEffect(() => {
    news = io.connect("http://localhost:8000/news");
    news.removeListener("news");
    news.on("news", function(data) {
      if (data.user === user || data.admin === true)
        setMessages([...messages, data]);
    });
  }, [messages]);

  const handleChange = e => {
    e.preventDefault();
    setMessage(e.target.value);
  };
  const handleSend = e => {
    e.preventDefault();

    axios.post(apiUrl + `/chat`, {
      message,
      user,
      admin
    });
    news.emit("news", { message, user, admin });

    setMessage("");
  };

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
            <Popper {...bindPopper(popupState)} placement="top-end" transition>
              {({ TransitionProps }) => (
                <Fade {...TransitionProps} timeout={350}>
                  <Paper className="chat-paper">
                    <div className="chat-head">
                      <div className="chat-headfont"> Customer Support</div>
                    </div>
                    <ScrollToBottom className="message-area">
                      {messages.map(msg => {
                        return (
                          <div className={!msg.admin ? "admin-msg" : ""}>
                            <div
                              className={
                                !msg.admin ? "admins-admin" : "admins-user"
                              }
                            >
                              <p>{msg.message}</p>
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
                          value={message}
                          onChange={handleChange}
                        />
                        <button
                          type="submit"
                          className="send-button"
                          onClick={handleSend}
                        >
                          <img width="25" height="25" src={sendIcons} alt="" />
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
