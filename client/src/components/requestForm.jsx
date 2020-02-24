import React, { Component } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { apiUrl } from "../config.json";

class RequestForm extends Component {
  constructor() {
    super();
    this.state = {};
  }
  componentDidMount() {
    const Id = this.props.match.params.id;

    axios
      .post(apiUrl + `/seller/request/:id`, {
        Id
      })
      .then(res => {
        let request = res.data;
        this.setState({
          id: request[0].id,
          companyName: request[0].companyName,
          sellerName: request[0].sellerName,
          address: request[0].address,
          email: request[0].email,
          contact: request[0].contact
        });
      });
  }
  handleApprove = event => {
    axios
      .post(apiUrl + `/seller/add`, {
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
  };
  handleDecline = event => {
    console.log("Declined");

    // axios
    //   .post(`http://localhost:8000/api/seller/add`, {
    //     companyName: this.state.companyName,
    //     sellerName: this.state.sellerName,
    //     companyAddress: this.state.companyAddress,
    //     email: this.state.email,
    //     contact: this.state.contact
    //   })
    //   .then(res => {
    //     console.log(res);
    //     this.props.history.push("/");
    //   })
    //   .catch(error => {
    //     this.setState({ error: error });
    //   });
  };
  render() {
    return (
      <div className="Request">
        <ToastContainer autoClose={2000} />
        <div className="companyName">Company Name:{this.state.companyName}</div>
        <div className="sellerName">Seller Name:{this.state.sellerName}</div>
        <div className="addres">Address{this.state.address}</div>
        <div className="email">Email:{this.state.email}</div>
        <div className="contact">Contact Number:{this.state.contact}</div>
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

export default RequestForm;
