import React, { Component } from "react";
import "firebase/storage";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { apiUrl } from "../config.json";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      companyName: "",
      sellerName: "",
      companyAddress: "",
      email: "",
      contact: ""
    };
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    axios
      .post(apiUrl + `/seller/request`, {
        companyName: this.state.companyName,
        sellerName: this.state.sellerName,
        companyAddress: this.state.companyAddress,
        email: this.state.email,
        contact: this.state.contact
      })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });
    this.setState({
      companyName: "",
      sellerName: "",
      companyAddress: "",
      email: "",
      contact: ""
    });
  };

  render() {
    return (
      <div className="login-container">
        <div className="title">Become a Seller!</div>
        <div className="forms-1">
          <form className="forms">
            <TextField
              className="input"
              type="text"
              name="companyName"
              id="companyName"
              label="Company Name"
              variant="outlined"
              value={this.state.companyName}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="sellerName"
              id="sellerName"
              label="Seller Name"
              variant="outlined"
              value={this.state.sellerName}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="email"
              id="email"
              label="Email"
              variant="outlined"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <TextField
              className="input"
              type="text"
              name="companyAddress"
              id="companyAddress"
              label="Company Address"
              variant="outlined"
              value={this.state.companyAddress}
              onChange={this.handleChange}
            />

            <TextField
              className="input"
              type="text"
              name="contact"
              id="contact"
              label="Contact Number"
              variant="outlined"
              value={this.state.contact}
              onChange={this.handleChange}
            />

            <Button
              variant="contained"
              color="primary"
              className="but"
              name="add"
              onClick={this.handleSubmit}
            >
              Request
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
export default Dashboard;
