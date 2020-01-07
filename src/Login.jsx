import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import firebase from "./firebase";
class Login extends Component {
  state = {
    email: "",
    password: "",
    error: null
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
        <div className="title-login">
          <div className="login">Log In</div>
        </div>

        <div className="forms-1">
          <form className="forms" onSubmit={this.handleSubmit}>
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={this.handleInputChange}
            />
            <input
              className="input"
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={this.handleInputChange}
            />
            {error ? (
              <div>
                <div>
                  <h5 className="error">{error.message}</h5>
                </div>
              </div>
            ) : null}
            <button className="button" children="Log In" />
          </form>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
