import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import { apiUrl } from "../config.json";

class Register extends Component {
  state = {
    email: "",
    password: "",
    isAdmin: false,
    isSellerAdmin: false,
    isSellerCompany: false,
    cart: 0,
    favs: 0,
    error: null
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const items = {
      email: this.state.email,
      password: this.state.password,
      isAdmin: this.state.isAdmin,
      cart: this.state.cart,
      isSellerAdmin: this.state.isSellerAdmin,
      isSellerCompany: this.state.isSellerCompany
    };

    axios
      .post(apiUrl + `/signup`, {
        email: this.state.email,
        password: this.state.password,
        isAdmin: this.state.isAdmin,
        cart: this.state.cart,
        isSellerAdmin: this.state.isSellerAdmin,
        isSellerCompany: this.state.isSellerCompany
      })
      .then(res => {
        this.props.history.push("/login");
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
              Sign Up
            </Button>
          </ValidatorForm>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
