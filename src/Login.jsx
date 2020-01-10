import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "./firebase";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null,
    user: ""
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        this.props.history.push({
          pathname: "/"
        });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-container">
        <div className="title">Log In</div>

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
              children="Log In"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
