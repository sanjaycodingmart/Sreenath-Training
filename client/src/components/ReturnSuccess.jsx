import React, { Component } from "react";
import img from "../images/return.png";

class Success extends Component {
  handleSubmit = () => {
    this.props.history.push("/");
  };
  render() {
    return (
      <div>
        <center>
          <img src={img} alt="success" />
          <h1>Sorry for the inconvinence</h1>
          <h4>
            You will get the reply mail if the Seller accepts your request
          </h4>
          <button className="keep" onClick={this.handleSubmit}>
            Keep Shopping
          </button>
        </center>
      </div>
    );
  }
}

export default Success;
