import React, { Component } from "react";
import banner from "../images/plusposter.jpg";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import jwt_decode from "jwt-decode";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { apiUrl } from "../config.json";
import Filter1SharpIcon from "@material-ui/icons/Filter1Sharp";

class BecomePlus extends Component {
  constructor() {
    super();
    this.state = {
      cost: 499,
      date: null,
      user: "",
      modelOpen: false
    };
  }
  componentDidMount() {
    if (localStorage.getItem("token")) {
      const decoded = jwt_decode(localStorage.getItem("token"));
      const user = decoded.email;
      this.setState({ user });
    }
  }
  handleOpen = () => {
    this.setState({ modelOpen: true });
  };

  handleClose = () => {
    this.setState({ modelOpen: false });
  };
  handleLogin = () => {
    window.location = "/login";
  };
  handleChange = e => {
    const value = e.target.value;
    var date = new Date();
    this.setState({ cost: value });
    if (value === "499") {
      var newDate = new Date(date.setMonth(date.getMonth() + 6));
      this.setState({ date: newDate });
    } else if (value === "899") {
      var newDate = new Date(date.setMonth(date.getMonth() + 12));
      this.setState({ date: newDate });
    } else if (value === "1299") {
      var newDate = new Date(date.setMonth(date.getMonth() + 18));
      this.setState({ date: newDate });
    }
  };
  handleRequest = e => {
    axios
      .post(apiUrl + `/plus`, {
        email: this.state.user,
        plusMember: true,
        plusPeriod: this.state.date
      })
      .then(res => {
        this.props.history.push("/plussuccess");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  render() {
    return (
      <div>
        <div className="plus-banner">
          <img src={banner} alt="" />
        </div>
        <div className="plus-button-space">
          <button className="plus-button" onClick={this.handleOpen}>
            Become Plus Member
          </button>
        </div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="plus-modal"
          open={this.state.modelOpen}
          onClose={this.handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500
          }}
        >
          <Fade in={this.state.modelOpen}>
            <div className="plus-modal-content">
              <h2>BUY PLUS MEMBERSHIP</h2>
              <div className="plus-bu">
                <TextField
                  id="plusPeriod"
                  select
                  className="plus-select"
                  label="Membership Period"
                  name="reasonReturn"
                  value={this.state.cost}
                  onChange={this.handleChange}
                  variant="outlined"
                >
                  <MenuItem key="6Months" value="499">
                    6 Months@499
                  </MenuItem>
                  <MenuItem key="1Year" value="899">
                    1 Year@899 (10% Discount)
                  </MenuItem>
                  <MenuItem key="2Year" value="1299">
                    2 Year@1299 (20% Discount)
                  </MenuItem>
                </TextField>
                {this.state.user !== "" ? (
                  <Button
                    variant="contained"
                    color="primary"
                    className="plus-but"
                    name="add"
                    onClick={this.handleRequest}
                  >
                    Buy now
                  </Button>
                ) : (
                  <div className="flex">
                    You are not logged in
                    <Button
                      variant="contained"
                      color="primary"
                      className="plus-but"
                      name="add"
                      onClick={this.handleLogin}
                    >
                      Login
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    );
  }
}

export default BecomePlus;
