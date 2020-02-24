import React, { Component } from "react";
import img from "../images/success.gif";

class Success extends Component {
  handleSubmit = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <center>
          <img src={img} alt="success" />
          <h1>Order Successfully Placed!</h1>
          <button className="keep" onClick={this.handleSubmit}>
            Keep Shopping
          </button>
        </center>
      </div>
    );
  }
}

export default Success;
