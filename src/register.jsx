import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "./firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class Register extends Component {
  state = {
    email: "",
    password: "",
    isAdmin: false,
    cart: 0,
    error: null
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const itemsRef = firebase.database().ref("users");
    const items = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: this.state.isAdmin,
      cart: this.state.cart
    };
    // alert(items);
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        itemsRef.push(items);
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-container">
        <div className="title">Sign up</div>

        <div className="forms-1">
          <form className="forms">
            <TextField
              className="input"
              type="text"
              name="email"
              value={email}
              label="Email"
              variant="outlined"
              onChange={this.handleInputChange}
            />
            <TextField
              className="input"
              type="password"
              name="password"
              value={password}
              label="Password"
              variant="outlined"
              onChange={this.handleInputChange}
            />
            {error ? (
              <div>
                <div>
                  <h5 className="error">{error.message}</h5>
                </div>
              </div>
            ) : null}
            <Button
              variant="contained"
              color="primary"
              className="submit"
              children="Sign Up"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
