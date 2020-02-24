import React, { Component } from "react";

import axios from "axios";
import jwt_decode from "jwt-decode";
import StripeCheckout from "react-stripe-checkout";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import { apiUrl } from "../config.json";

const style = {
  base: {
    color: "#32325d",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    fontSmoothing: "antialiased",
    fontSize: "16px",
    "::placeholder": {
      color: "#aab7c4"
    }
  },
  invalid: {
    color: "#fa755a",
    iconColor: "#fa755a"
  }
};

class Payment extends Component {
  constructor() {
    super();
    this.state = {
      products: [],
      total: 0,

      name: "",
      address: "",
      city: "",
      pin: ""
    };
  }
  async componentDidMount() {
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.id;
    await axios
      .post(apiUrl + `/cartItem`, {
        userId
      })
      .then(res => {
        let products = res.data;
        let newState = [];
        for (let product in products) {
          newState.push({
            id: products[product].Product.id,
            Products: products[product].Product.product,
            Price: products[product].price,
            Category: products[product].Product.category,
            Quantity: products[product].Product.quantity,
            url: products[product].Product.url,
            fav: products[product].Product.fav
          });
        }
        this.setState({
          products: newState
        });
        this.addTotal();
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  addTotal = () => {
    let proLen = this.state.products.length;
    let product = this.state.products;

    let total = 0;
    for (let i = 0; i < proLen; i++) {
      let price = JSON.parse(product[i].Price);
      total = total + price;
    }
    this.setState({ total });
  };
  successPayment = async data => {
    const transId = data.data.success.id;
    const decoded = jwt_decode(localStorage.getItem("token"));
    const userId = decoded.email;
    const Ids = decoded.id;
    let product;

    for (let i = 0; i < this.state.products.length; i++) {
      product = this.state.products[i].id;

      await axios
        .post(apiUrl + `/order`, {
          userId,
          product,
          transId,
          tracking: "Order Received",
          estDD: "Deliver in 3 to 5 days"
        })
        .catch(error => {
          this.setState({ error: error });
        });
    }

    await axios.post(apiUrl + `/mail`, {
      userId,
      product,
      Ids
    });

    toast.success("Order Successful!", {
      position: toast.POSITION.TOP_CENTER
    });
    this.props.history.push("/success");
  };
  errorPayment = data => {
    console.log("Payment Error");
  };
  onToken = amount => token => {
    axios
      .post(apiUrl + `/payment`, {
        description: "user payment",
        source: token.id,
        currency: "INR",
        amount: amount * 100
      })
      .then(this.successPayment)
      .catch(this.errorPayment);
  };
  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  render() {
    return (
      <div>
        <div className="pay-title">ShippingAddress</div>
        <div className="address">
          <ValidatorForm
            className="forms"
            ref="form"
            onSubmit={this.handleSubmit}
            onError={errors => console.log(errors)}
          >
            <TextValidator
              className="input"
              label="Name"
              onChange={this.handleInputChange}
              name="name"
              value={this.state.email}
              variant="outlined"
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              className="input"
              label="Address"
              onChange={this.handleInputChange}
              name="address"
              type="address"
              variant="outlined"
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={this.state.street}
            />
            <TextValidator
              className="input"
              label="City"
              onChange={this.handleInputChange}
              name="city"
              type="city"
              variant="outlined"
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={this.state.city}
            />
            <TextValidator
              className="input"
              label="Pincode"
              onChange={this.handleInputChange}
              name="pin"
              type="pin"
              variant="outlined"
              validators={["required"]}
              errorMessages={["this field is required"]}
              value={this.state.pin}
            />{" "}
          </ValidatorForm>
        </div>
        <div className="pay">
          <StripeCheckout
            className="input"
            name="Final Step"
            description="User Payment"
            amount={this.state.total * 100}
            token={this.onToken(this.state.total)}
            currency="INR"
            stripeKey="pk_test_e4IL03YaGsR8qnh0LgNjtZ4T00Y0sR9Jqt"
          />
        </div>
      </div>
    );
  }
}

export default Payment;
