import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../config.json";

class ReturnApproveForm extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const Id = this.props.match.params.id;

    axios
      .post(apiUrl + `/returns/:id`, {
        Id
      })
      .then(res => {
        let request = res.data;
        this.setState({
          id: request[0].id,
          userId: request[0].userId,
          productId: request[0].productId,
          transId: request[0].transId,
          seller: request[0].seller,
          reason: request[0].reason
        });
      });
  }
  handleApprove = event => {
    axios
      .post(apiUrl + `/returns/accept`, {
        Id: this.state.id
      })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  handleDecline = event => {
    axios
      .post(apiUrl + `/returns/decline`, {
        Id: this.state.id
      })
      .then(res => {
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ error: error });
      });
  };
  render() {
    return (
      <div className="Request">
        <ToastContainer autoClose={2000} />
        <div className="companyName">User Name: {this.state.userId}</div>
        <div className="sellerName">Seller Name: {this.state.seller}</div>
        <div className="addres">Returning Product: {this.state.productId}</div>
        <div className="email">Transaction Id: {this.state.transId}</div>
        <div className="contact">Reason: {this.state.reason}</div>
        <div className="req-buttons">
          <button className="approve" onClick={this.handleApprove}>
            Approve
          </button>
          <button className="decline" onClick={this.hadleDecline}>
            Decline
          </button>
        </div>
      </div>
    );
  }
}

export default ReturnApproveForm;
