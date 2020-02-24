import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import auth from "../services/authService";

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
  handleSubmit = async event => {
    event.preventDefault();
    try {
      await auth.login(this.state.email, this.state.password);

      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    const { email, password, error } = this.state;
    return (
      <div className="login-container">
        <div className="title">Log In</div>

        <div className="forms-1">
          <ValidatorForm
            className="forms"
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className="input"
              label="Email"
              onChange={this.handleInputChange}
              name="email"
              value={email}
              variant="outlined"
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <TextValidator
              className="input"
              label="Password"
              onChange={this.handleInputChange}
              name="password"
              type="password"
              variant="outlined"
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={password}
            />

            {error ? (
              <div>
                <div>
                  <h5 className="error">{error.message}</h5>
                </div>
              </div>
            ) : null}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="submit"
            >
              Sign In
            </Button>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}
export default withRouter(Login);
